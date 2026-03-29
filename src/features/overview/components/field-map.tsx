// src/features/overview/components/field-map.tsx
'use client';

import { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FieldStatus, FieldPlacement } from '@/constants/mock-dashboard';

interface FieldMapProps {
  statuses: FieldStatus[];
  placements: FieldPlacement[];
}

// 修繕待ち件数に応じた色を返す
// 0件: 緑, 1〜2件: 黄, 3〜4件: オレンジ, 5件以上: 赤
function getFieldColor(count: number): {
  fill: string;
  stroke: string;
  text: string;
} {
  if (count === 0) {
    return {
      fill: 'rgba(34, 197, 94, 0.2)',
      stroke: 'rgb(34, 197, 94)',
      text: 'rgb(22, 163, 74)'
    };
  }
  if (count <= 2) {
    return {
      fill: 'rgba(234, 179, 8, 0.2)',
      stroke: 'rgb(234, 179, 8)',
      text: 'rgb(161, 98, 7)'
    };
  }
  if (count <= 4) {
    return {
      fill: 'rgba(249, 115, 22, 0.25)',
      stroke: 'rgb(249, 115, 22)',
      text: 'rgb(194, 65, 12)'
    };
  }
  return {
    fill: 'rgba(239, 68, 68, 0.25)',
    stroke: 'rgb(239, 68, 68)',
    text: 'rgb(185, 28, 28)'
  };
}

// 凡例コンポーネント
function Legend() {
  const items = [
    { label: '0件', count: 0 },
    { label: '1〜2件', count: 1 },
    { label: '3〜4件', count: 3 },
    { label: '5件以上', count: 5 }
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="text-muted-foreground text-xs font-medium">
        修繕待ち:
      </span>
      {items.map((item) => {
        const color = getFieldColor(item.count);
        return (
          <div key={item.label} className="flex items-center gap-1.5">
            <svg width={14} height={14}>
              <circle
                cx={7}
                cy={7}
                r={6}
                fill={color.fill}
                stroke={color.stroke}
                strokeWidth={1.5}
              />
            </svg>
            <span className="text-muted-foreground text-xs">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function FieldMap({ statuses, placements }: FieldMapProps) {
  const [zoom, setZoom] = useState(1);

  // グリッドの行数・列数を配置データから自動計算
  const maxRow = Math.max(...placements.map((p) => p.row));
  const maxCol = Math.max(...placements.map((p) => p.col));
  const rows = maxRow + 1;
  const cols = maxCol + 1;

  // SVG の寸法を計算
  // 各セルは 120x140（円の直径 + ラベル分の余白）
  const cellWidth = 120;
  const cellHeight = 140;
  const padding = 40;
  const svgWidth = cols * cellWidth + padding * 2;
  const svgHeight = rows * cellHeight + padding * 2;

  // fieldId → FieldStatus のルックアップ
  const statusMap = new Map(statuses.map((s) => [s.fieldId, s]));

  // ズーム操作
  const zoomIn = () => setZoom((z) => Math.min(z + 0.2, 2.0));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.4));
  const zoomReset = () => setZoom(1);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">フィールド状況</CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={zoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-muted-foreground w-12 text-center text-xs tabular-nums">
              {Math.round(zoom * 100)}%
            </span>
            <Button variant="ghost" size="icon" onClick={zoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={zoomReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Legend />
      </CardHeader>

      <CardContent className="p-4">
        {/* スクロール可能なコンテナ */}
        <div
          className="overflow-auto rounded-md border"
          style={{ maxHeight: '60vh' }}
        >
          <svg
            width={svgWidth * zoom}
            height={svgHeight * zoom}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="block"
          >
            {/* 背景 */}
            <rect
              width={svgWidth}
              height={svgHeight}
              fill="hsl(var(--card))"
            />

            {/* グリッドの補助線（薄いドット） */}
            {Array.from({ length: rows + 1 }).map((_, r) => (
              <line
                key={`h-${r}`}
                x1={padding}
                y1={padding + r * cellHeight}
                x2={padding + cols * cellWidth}
                y2={padding + r * cellHeight}
                stroke="hsl(var(--border))"
                strokeWidth={0.5}
                strokeDasharray="4 4"
                opacity={0.5}
              />
            ))}
            {Array.from({ length: cols + 1 }).map((_, c) => (
              <line
                key={`v-${c}`}
                x1={padding + c * cellWidth}
                y1={padding}
                x2={padding + c * cellWidth}
                y2={padding + rows * cellHeight}
                stroke="hsl(var(--border))"
                strokeWidth={0.5}
                strokeDasharray="4 4"
                opacity={0.5}
              />
            ))}

            {/* 各フィールドの円を配置 */}
            {placements.map((placement) => {
              const status = statusMap.get(placement.fieldId);
              if (!status) return null;

              // セルの中心座標を計算
              const cx = padding + placement.col * cellWidth + cellWidth / 2;
              const cy = padding + placement.row * cellHeight + cellHeight / 2 + 8;
              const radius = 42;
              const color = getFieldColor(status.pendingRepairCount);

              return (
                <g key={placement.fieldId}>
                  {/* フィールド番号（円の上） */}
                  <text
                    x={cx}
                    y={cy - radius - 10}
                    textAnchor="middle"
                    fontSize={13}
                    fontWeight={600}
                    fill="hsl(var(--foreground))"
                  >
                    {status.label}
                  </text>

                  {/* 円（フィールド本体） */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill={color.fill}
                    stroke={color.stroke}
                    strokeWidth={2.5}
                  />

                  {/* 修繕待ち件数（円の中央） */}
                  <text
                    x={cx}
                    y={cy + 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={22}
                    fontWeight={700}
                    fill={color.text}
                  >
                    {status.pendingRepairCount}
                  </text>

                  {/* 「件」ラベル（数字の下） */}
                  <text
                    x={cx}
                    y={cy + 22}
                    textAnchor="middle"
                    fontSize={10}
                    fill={color.text}
                    opacity={0.8}
                  >
                    件
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}

// src/features/detection-history/components/detection-location-map.tsx
'use client';

import type { DetectionLocation } from '@/constants/mock-history';

interface DetectionLocationMapProps {
  locations: DetectionLocation[];
  /** SVGの表示サイズ（px）。デフォルトは200 */
  size?: number;
}

export function DetectionLocationMap({
  locations,
  size = 200
}: DetectionLocationMapProps) {
  // SVG内部の座標系（viewBoxの大きさ）
  const viewSize = 200;
  // 円の半径と中心
  const center = viewSize / 2;  // = 100
  const radius = 90;

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-muted-foreground text-xs font-medium">検知位置</p>

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${viewSize} ${viewSize}`}
        className="border rounded-md"
      >
        {/* --- 背景の円（フィールドを表す） --- */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="hsl(var(--muted))"
          stroke="hsl(var(--border))"
          strokeWidth={2}
        />

        {/* --- 十字の補助線（位置を把握しやすくする） --- */}
        <line
          x1={center - radius}
          y1={center}
          x2={center + radius}
          y2={center}
          stroke="hsl(var(--border))"
          strokeWidth={0.5}
          strokeDasharray="4 4"
        />
        <line
          x1={center}
          y1={center - radius}
          x2={center}
          y2={center + radius}
          stroke="hsl(var(--border))"
          strokeWidth={0.5}
          strokeDasharray="4 4"
        />

        {/* --- 検知位置（赤い四角） --- */}
        {locations.map((loc, i) => {
          // 相対座標（0〜1）を円の内部座標に変換
          // 円の左上を(0,0)、右下を(1,1)とする
          const diameter = radius * 2;
          const originX = center - radius;
          const originY = center - radius;
          const rectSize = loc.size * diameter;
          const rectX = originX + loc.cx * diameter - rectSize / 2;
          const rectY = originY + loc.cy * diameter - rectSize / 2;

          return (
            <g key={i}>
              {/* 赤い四角（半透明） */}
              <rect
                x={rectX}
                y={rectY}
                width={rectSize}
                height={rectSize}
                fill="rgba(239, 68, 68, 0.35)"
                stroke="rgb(239, 68, 68)"
                strokeWidth={2}
                rx={2}
              />
              {/* ラベル */}
              <text
                x={rectX + rectSize / 2}
                y={rectY - 4}
                textAnchor="middle"
                fontSize={9}
                fill="hsl(var(--foreground))"
                className="font-medium"
              >
                {loc.label}
              </text>
            </g>
          );
        })}

        {/* --- 中心のラベル --- */}
        <text
          x={center}
          y={viewSize - 4}
          textAnchor="middle"
          fontSize={10}
          fill="hsl(var(--muted-foreground))"
        >
          フィールド
        </text>
      </svg>
    </div>
  );
}

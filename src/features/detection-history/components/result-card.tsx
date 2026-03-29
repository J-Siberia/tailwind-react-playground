// src/features/detection-history/components/result-card.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Wrench, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { DetectionLocationMap } from './detection-location-map';
import type { HistoryItem } from '@/constants/mock-history';
import type { DetectionStatus } from '@/features/detection-review/types';

// ステータスに応じたバッジ
function StatusBadge({ status }: { status: DetectionStatus }) {
  const config: Record<
    DetectionStatus,
    { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
  > = {
    pending:   { label: '未チェック', variant: 'outline' },
    approved:  { label: '検知成功',   variant: 'default' },
    rejected:  { label: '検知失敗',   variant: 'destructive' },
    corrected: { label: '修正済み',   variant: 'secondary' }
  };
  const { label, variant } = config[status];
  return <Badge variant={variant}>{label}</Badge>;
}

interface ResultCardProps {
  item: HistoryItem;
}

export function ResultCard({ item }: ResultCardProps) {
  const [repaired, setRepaired] = useState(item.repaired);

  const handleRepair = () => {
    setRepaired(true);
    // TODO: 本来はここでAPIへPOSTする
    // await fetch(`/api/detections/${item.id}/repair`, { method: 'POST' });
  };

  return (
    <Card>
      <CardContent className="p-4">
        {/* ヘッダー情報 */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">ID: {item.id}</span>
            <StatusBadge status={item.status} />
            {repaired && (
              <Badge
                variant="outline"
                className="border-green-500 text-green-600"
              >
                <CheckCircle2 className="mr-1 h-3 w-3" />
                修繕完了
              </Badge>
            )}
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <span>検知数: {item.detectionCount}</span>
            <span>|</span>
            <span>
              {new Date(item.detectedAt).toLocaleString('ja-JP')}
            </span>
          </div>
        </div>

        {/* --- メインコンテンツ：画像と位置図を横に並べる --- */}
        <div className="flex gap-4">
          {/* 検知結果画像 */}
          <div className="flex-1">
            <p className="text-muted-foreground mb-1 text-xs font-medium">
              検知結果画像
            </p>
            <div className="bg-muted relative aspect-[4/3] overflow-hidden rounded-md">
              <Image
                src={item.annotatedImageUrl}
                alt={`検知結果 ${item.id}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          {/* 検知位置の図 */}
          <div className="flex items-center">
            <DetectionLocationMap locations={item.locations} size={200} />
          </div>
        </div>
      </CardContent>

      {/* 修繕完了ボタン */}
      <CardFooter className="border-t px-4 py-3">
        <Button
          variant={repaired ? 'outline' : 'default'}
          onClick={handleRepair}
          disabled={repaired}
          className="w-full"
        >
          {repaired ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
              修繕完了済み
            </>
          ) : (
            <>
              <Wrench className="mr-2 h-4 w-4" />
              修繕完了
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

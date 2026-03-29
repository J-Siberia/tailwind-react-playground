// src/features/detection-review/components/review-panel.tsx
'use client';

import { useState, useCallback } from 'react';
import { Check, X, Pencil, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ImageCompare } from './image-compare';
import type { DetectionResult, DetectionStatus } from '../types';

interface ReviewPanelProps {
  detections: DetectionResult[];
}

// ステータスに応じたバッジの表示
function StatusBadge({ status }: { status: DetectionStatus }) {
  const config: Record<
    DetectionStatus,
    { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }
  > = {
    pending: { label: '未チェック', variant: 'outline' },
    approved: { label: '検知成功', variant: 'default' },
    rejected: { label: '検知失敗', variant: 'destructive' },
    corrected: { label: '修正済み', variant: 'secondary' }
  };

  const { label, variant } = config[status];
  return <Badge variant={variant}>{label}</Badge>;
}

export function ReviewPanel({ detections: initial }: ReviewPanelProps) {
  const [detections, setDetections] = useState(initial);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [memo, setMemo] = useState('');

  const current = detections[currentIndex];
  const total = detections.length;
  const reviewed = detections.filter((d) => d.status !== 'pending').length;

  // --- アクション ---
  const handleAction = useCallback(
    (status: DetectionStatus) => {
      setDetections((prev) =>
        prev.map((d, i) =>
          i === currentIndex
            ? { ...d, status, memo: memo || undefined }
            : d
        )
      );
      setMemo('');

      // TODO: ここで実際にはAPIへPOSTする
      // await fetch('/api/detections/${current.id}/review', {
      //   method: 'POST',
      //   body: JSON.stringify({ status, memo })
      // });

      // 次の未チェック項目へ自動遷移
      const nextPending = detections.findIndex(
        (d, i) => i > currentIndex && d.status === 'pending'
      );
      if (nextPending !== -1) {
        setCurrentIndex(nextPending);
      } else if (currentIndex < total - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    },
    [currentIndex, detections, memo, total]
  );

  // --- ナビゲーション ---
  const goTo = (index: number) => {
    if (index >= 0 && index < total) {
      setCurrentIndex(index);
      setMemo('');
    }
  };

  if (!current) return null;

  return (
    <div className="space-y-6">
      {/* ヘッダー：進捗 + ナビゲーション */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">検知結果チェック</h2>
          <Badge variant="outline">
            {reviewed}/{total} 完了
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => goTo(currentIndex - 1)}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-muted-foreground text-sm tabular-nums">
            {currentIndex + 1} / {total}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goTo(currentIndex + 1)}
            disabled={currentIndex === total - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* メタ情報 */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">
              ID: {current.id}
            </CardTitle>
            <div className="flex items-center gap-2">
              <StatusBadge status={current.status} />
              <span className="text-muted-foreground text-sm">
                {new Date(current.detectedAt).toLocaleString('ja-JP')}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 画像比較 */}
          <ImageCompare detection={current} />

          {/* メモ欄 */}
          <div>
            <label
              htmlFor="review-memo"
              className="text-sm font-medium mb-1 block"
            >
              メモ（任意）
            </label>
            <Textarea
              id="review-memo"
              placeholder="検知結果に関するメモを入力..."
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>

        {/* アクションボタン */}
        <CardFooter className="flex justify-end gap-3 border-t pt-4">
          <Button
            variant="outline"
            onClick={() => handleAction('corrected')}
            disabled={current.status !== 'pending'}
          >
            <Pencil className="mr-2 h-4 w-4" />
            修正
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleAction('rejected')}
            disabled={current.status !== 'pending'}
          >
            <X className="mr-2 h-4 w-4" />
            検知失敗
          </Button>
          <Button
            onClick={() => handleAction('approved')}
            disabled={current.status !== 'pending'}
          >
            <Check className="mr-2 h-4 w-4" />
            検知成功
          </Button>
        </CardFooter>
      </Card>

      {/* サムネイルナビゲーション */}
      <Card>
        <CardContent className="p-4">
          <p className="text-sm font-medium mb-3">チェック一覧</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {detections.map((d, i) => (
              <button
                key={d.id}
                type="button"
                onClick={() => goTo(i)}
                className={`
                  flex flex-col items-center gap-1 rounded-md border p-2
                  min-w-[80px] transition-colors
                  ${i === currentIndex
                    ? 'border-primary bg-accent'
                    : 'border-border hover:bg-accent/50'
                  }
                `}
              >
                <span className="font-mono text-xs">{i + 1}</span>
                <StatusBadge status={d.status} />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

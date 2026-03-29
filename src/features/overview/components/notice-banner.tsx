// src/features/overview/components/notice-banner.tsx
'use client';

import Link from 'next/link';
import { AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface NoticeBannerProps {
  uncheckedCount: number;
}

export function NoticeBanner({ uncheckedCount }: NoticeBannerProps) {
  // 未チェックがない場合は「問題なし」の表示
  if (uncheckedCount === 0) {
    return (
      <Alert>
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>お知らせ</AlertTitle>
        <AlertDescription>
          現在、未チェックの検知結果はありません。
        </AlertDescription>
      </Alert>
    );
  }

  // 未チェックがある場合は警告表示
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>未チェックの検知結果があります</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>
          <strong>{uncheckedCount}件</strong>
          の検知結果がチェックされていません。早めに確認してください。
        </span>
        <Button
          variant="outline"
          size="sm"
          asChild
          className="ml-4 shrink-0 border-current text-current hover:bg-destructive/10"
        >
          <Link href="/dashboard/detection-review">
            チェック画面へ
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
}

// src/features/overview/components/status-summary.tsx
'use client';

import { ScanSearch, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatusSummaryProps {
  uncheckedCount: number;
  pendingRepairCount: number;
}

export function StatusSummary({
  uncheckedCount,
  pendingRepairCount
}: StatusSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* 未チェック件数 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">未チェック</CardTitle>
          <ScanSearch className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uncheckedCount}件</div>
          <p className="text-muted-foreground text-xs">
            AIが検知した結果のうち、人間のチェックが未完了のもの
          </p>
        </CardContent>
      </Card>

      {/* 修繕待ち件数 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">修繕待ち</CardTitle>
          <Wrench className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingRepairCount}件</div>
          <p className="text-muted-foreground text-xs">
            全フィールドにおいて、修繕が完了していない検知結果の合計
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

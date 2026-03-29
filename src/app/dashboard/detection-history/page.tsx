// src/app/dashboard/detection-history/page.tsx

import { HistoryViewer } from '@/features/detection-history/components/history-viewer';
import { mockHistory } from '@/constants/mock-history';

export const metadata = {
  title: '検知結果履歴'
};

export default function DetectionHistoryPage() {
  // 本来はここでAPIからデータを取得する
  // const history = await fetch('/api/detections/history').then(r => r.json());

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <HistoryViewer items={mockHistory} />
    </div>
  );
}

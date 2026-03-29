// src/app/dashboard/detection-review/page.tsx

import { ReviewPanel } from '@/features/detection-review/components/review-panel';
import { mockDetections } from '@/constants/mock-detections';

export const metadata = {
  title: '検知結果チェック'
};

export default function DetectionReviewPage() {
  // 本来はここでAPIからデータを取得する
  // const detections = await fetch('/api/detections?status=pending').then(r => r.json());

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <ReviewPanel detections={mockDetections} />
    </div>
  );
}

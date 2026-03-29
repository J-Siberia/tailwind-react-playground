// src/constants/mock-history.ts

import type { DetectionStatus } from '@/features/detection-review/types';

// 検知位置を円の中での相対座標（0〜1）で表現する
// cx, cy: 円の中心を(0.5, 0.5)とした相対位置
// size: 四角の大きさ（相対値）
export interface DetectionLocation {
  cx: number;
  cy: number;
  size: number;
  label: string;
}

export interface HistoryItem {
  id: string;
  fieldId: number;
  annotatedImageUrl: string;
  detectedAt: string;
  status: DetectionStatus;
  repaired: boolean;
  detectionCount: number;
  locations: DetectionLocation[];
}

export const mockHistory: HistoryItem[] = [
  // === フィールド 1 ===
  {
    id: 'hist-001',
    fieldId: 1,
    annotatedImageUrl: 'https://placehold.co/640x480/16213e/00ff88?text=Field1+Detection+A',
    detectedAt: '2026-03-28T09:12:00',
    status: 'approved',
    repaired: false,
    detectionCount: 2,
    locations: [
      { cx: 0.3, cy: 0.35, size: 0.12, label: '部品A' },
      { cx: 0.7, cy: 0.6, size: 0.1, label: '部品B' }
    ]
  },
  {
    id: 'hist-002',
    fieldId: 1,
    annotatedImageUrl: 'https://placehold.co/640x480/16213e/ffaa00?text=Field1+Detection+B',
    detectedAt: '2026-03-28T10:45:00',
    status: 'rejected',
    repaired: false,
    detectionCount: 1,
    locations: [
      { cx: 0.5, cy: 0.4, size: 0.15, label: '異常箇所' }
    ]
  },
  {
    id: 'hist-003',
    fieldId: 1,
    annotatedImageUrl: 'https://placehold.co/640x480/16213e/4488ff?text=Field1+Detection+C',
    detectedAt: '2026-03-28T14:20:00',
    status: 'approved',
    repaired: true,
    detectionCount: 3,
    locations: [
      { cx: 0.25, cy: 0.3, size: 0.08, label: '部品C' },
      { cx: 0.6, cy: 0.25, size: 0.1, label: '部品D' },
      { cx: 0.45, cy: 0.7, size: 0.11, label: '部品E' }
    ]
  },
  {
    id: 'hist-004',
    fieldId: 1,
    annotatedImageUrl: 'https://placehold.co/640x480/16213e/ff4444?text=Field1+Detection+D',
    detectedAt: '2026-03-29T08:00:00',
    status: 'corrected',
    repaired: false,
    detectionCount: 1,
    locations: [
      { cx: 0.55, cy: 0.5, size: 0.13, label: '修正箇所' }
    ]
  },
  // === フィールド 2 ===
  {
    id: 'hist-005',
    fieldId: 2,
    annotatedImageUrl: 'https://placehold.co/640x480/1a1a2e/00ff88?text=Field2+Detection+A',
    detectedAt: '2026-03-28T11:30:00',
    status: 'approved',
    repaired: false,
    detectionCount: 2,
    locations: [
      { cx: 0.4, cy: 0.45, size: 0.1, label: '部品F' },
      { cx: 0.65, cy: 0.3, size: 0.09, label: '部品G' }
    ]
  },
  {
    id: 'hist-006',
    fieldId: 2,
    annotatedImageUrl: 'https://placehold.co/640x480/1a1a2e/ff88cc?text=Field2+Detection+B',
    detectedAt: '2026-03-29T07:15:00',
    status: 'approved',
    repaired: true,
    detectionCount: 1,
    locations: [
      { cx: 0.35, cy: 0.55, size: 0.14, label: '異常箇所' }
    ]
  },
  // === フィールド 3 ===
  {
    id: 'hist-007',
    fieldId: 3,
    annotatedImageUrl: 'https://placehold.co/640x480/2e1a2e/ffaa00?text=Field3+Detection+A',
    detectedAt: '2026-03-29T09:00:00',
    status: 'rejected',
    repaired: false,
    detectionCount: 2,
    locations: [
      { cx: 0.5, cy: 0.35, size: 0.12, label: '部品H' },
      { cx: 0.3, cy: 0.65, size: 0.08, label: '部品I' }
    ]
  }
];

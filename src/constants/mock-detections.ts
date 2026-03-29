// src/constants/mock-detections.ts

import type { DetectionResult } from '@/features/detection-review/types';

export const mockDetections: DetectionResult[] = [
  {
    id: 'det-001',
    originalImageUrl: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Original+Image+1',
    annotatedImageUrl: 'https://placehold.co/800x600/16213e/00ff88?text=Annotated+Image+1',
    detectedAt: '2026-03-29T10:23:00',
    status: 'pending',
    boundingBoxes: [
      { x: 120, y: 80, width: 200, height: 150, label: '部品A', confidence: 0.95 },
      { x: 400, y: 200, width: 180, height: 120, label: '部品B', confidence: 0.87 }
    ],
    cameraId: 'CAM-01'
  },
  {
    id: 'det-002',
    originalImageUrl: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Original+Image+2',
    annotatedImageUrl: 'https://placehold.co/800x600/16213e/ff4444?text=Annotated+Image+2',
    detectedAt: '2026-03-29T10:24:30',
    status: 'pending',
    boundingBoxes: [
      { x: 300, y: 100, width: 250, height: 200, label: '異常箇所', confidence: 0.72 }
    ],
    cameraId: 'CAM-02'
  },
  {
    id: 'det-003',
    originalImageUrl: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Original+Image+3',
    annotatedImageUrl: 'https://placehold.co/800x600/16213e/ffaa00?text=Annotated+Image+3',
    detectedAt: '2026-03-29T10:25:15',
    status: 'pending',
    boundingBoxes: [
      { x: 50, y: 50, width: 300, height: 250, label: '部品C', confidence: 0.91 },
      { x: 500, y: 300, width: 150, height: 100, label: '部品D', confidence: 0.68 },
      { x: 200, y: 400, width: 100, height: 80, label: '部品E', confidence: 0.55 }
    ],
    cameraId: 'CAM-01'
  },
  {
    id: 'det-004',
    originalImageUrl: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Original+Image+4',
    annotatedImageUrl: 'https://placehold.co/800x600/16213e/4488ff?text=Annotated+Image+4',
    detectedAt: '2026-03-29T10:26:45',
    status: 'pending',
    boundingBoxes: [
      { x: 350, y: 150, width: 200, height: 180, label: '部品F', confidence: 0.98 }
    ],
    cameraId: 'CAM-03'
  },
  {
    id: 'det-005',
    originalImageUrl: 'https://placehold.co/800x600/1a1a2e/ffffff?text=Original+Image+5',
    annotatedImageUrl: 'https://placehold.co/800x600/16213e/ff88cc?text=Annotated+Image+5',
    detectedAt: '2026-03-29T10:28:00',
    status: 'pending',
    boundingBoxes: [
      { x: 100, y: 200, width: 220, height: 160, label: '異常箇所', confidence: 0.63 },
      { x: 450, y: 100, width: 180, height: 140, label: '部品G', confidence: 0.89 }
    ],
    cameraId: 'CAM-02'
  }
];

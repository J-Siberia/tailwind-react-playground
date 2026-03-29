// src/features/detection-review/types/index.ts

export type DetectionStatus = 'pending' | 'approved' | 'rejected' | 'corrected';

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidence: number;
}

export interface DetectionResult {
  id: string;
  originalImageUrl: string;
  annotatedImageUrl: string;
  detectedAt: string;
  status: DetectionStatus;
  boundingBoxes: BoundingBox[];
  cameraId: string;
  memo?: string;
}

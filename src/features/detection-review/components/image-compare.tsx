// src/features/detection-review/components/image-compare.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { DetectionResult } from '../types';

interface ImageCompareProps {
  detection: DetectionResult;
}

type ViewMode = 'side-by-side' | 'overlay';

export function ImageCompare({ detection }: ImageCompareProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('side-by-side');
  const [showAnnotated, setShowAnnotated] = useState(true);

  return (
    <div className="space-y-3">
      {/* 表示モード切り替え */}
      <div className="flex items-center justify-between">
        <Tabs
          value={viewMode}
          onValueChange={(v) => setViewMode(v as ViewMode)}
        >
          <TabsList>
            <TabsTrigger value="side-by-side">並べて表示</TabsTrigger>
            <TabsTrigger value="overlay">重ねて表示</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Badge variant="outline">{detection.cameraId}</Badge>
          <Badge variant="secondary">
            {detection.boundingBoxes.length}件検知
          </Badge>
        </div>
      </div>

      {/* 画像表示エリア */}
      {viewMode === 'side-by-side' ? (
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-2">
              <p className="text-muted-foreground mb-2 text-center text-sm font-medium">
                元画像
              </p>
              <div className="bg-muted relative aspect-[4/3] overflow-hidden rounded-md">
                <Image
                  src={detection.originalImageUrl}
                  alt="元画像"
                  fill
                  className="object-cover"
                  unoptimized // 外部URLのため
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-2">
              <p className="text-muted-foreground mb-2 text-center text-sm font-medium">
                検知結果
              </p>
              <div className="bg-muted relative aspect-[4/3] overflow-hidden rounded-md">
                <Image
                  src={detection.annotatedImageUrl}
                  alt="検知結果"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="p-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-muted-foreground text-sm font-medium">
                {showAnnotated ? '検知結果' : '元画像'}
              </p>
              <button
                type="button"
                onClick={() => setShowAnnotated(!showAnnotated)}
                className="text-muted-foreground hover:text-foreground text-sm underline transition-colors"
              >
                {showAnnotated ? '元画像を表示' : '検知結果を表示'}
              </button>
            </div>
            <div className="bg-muted relative aspect-[4/3] overflow-hidden rounded-md">
              <Image
                src={
                  showAnnotated
                    ? detection.annotatedImageUrl
                    : detection.originalImageUrl
                }
                alt={showAnnotated ? '検知結果' : '元画像'}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* 検知ボックス情報テーブル */}
      <Card>
        <CardContent className="p-4">
          <p className="text-sm font-medium mb-2">検知オブジェクト一覧</p>
          <div className="divide-y">
            {detection.boundingBoxes.map((box, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    {i + 1}
                  </Badge>
                  <span className="text-sm">{box.label}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">
                    ({box.x}, {box.y}) {box.width}×{box.height}
                  </span>
                  <Badge
                    variant={box.confidence >= 0.8 ? 'default' : 'secondary'}
                  >
                    {(box.confidence * 100).toFixed(0)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

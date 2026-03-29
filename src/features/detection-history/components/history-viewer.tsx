// src/features/detection-history/components/history-viewer.tsx
'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ResultCard } from './result-card';
import type { HistoryItem } from '@/constants/mock-history';

interface HistoryViewerProps {
  items: HistoryItem[];
}

export function HistoryViewer({ items }: HistoryViewerProps) {
  const [fieldInput, setFieldInput] = useState('');

  // 入力値を数値に変換（空文字や不正値はnullにする）
  const fieldId = fieldInput === '' ? null : Number(fieldInput);
  const isValidInput = fieldId !== null && !isNaN(fieldId) && fieldId > 0;

  // データ内に存在するフィールド番号の一覧を取得
  const availableFields = useMemo(() => {
    const ids = [...new Set(items.map((item) => item.fieldId))];
    return ids.sort((a, b) => a - b);
  }, [items]);

  // 入力されたフィールド番号でフィルタリング
  const filtered = useMemo(() => {
    if (!isValidInput) return [];
    return items.filter((item) => item.fieldId === fieldId);
  }, [items, fieldId, isValidInput]);

  return (
    <div className="space-y-6">
      {/* --- フィールド番号入力エリア --- */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-end gap-4">
            {/* 入力欄 */}
            <div className="flex-1 max-w-xs">
              <label
                htmlFor="field-number"
                className="text-sm font-medium mb-1 block"
              >
                フィールド番号
              </label>
              <div className="relative">
                <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="field-number"
                  type="number"
                  min={1}
                  placeholder="例: 1"
                  value={fieldInput}
                  onChange={(e) => setFieldInput(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* 利用可能なフィールド番号のヒント */}
            <div className="flex items-center gap-2 pb-1">
              <span className="text-muted-foreground text-sm">
                利用可能:
              </span>
              {availableFields.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFieldInput(String(id))}
                  className="cursor-pointer"
                >
                  <Badge
                    variant={fieldId === id ? 'default' : 'outline'}
                    className="transition-colors hover:bg-accent"
                  >
                    {id}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- 結果表示エリア --- */}
      {!isValidInput && fieldInput !== '' && (
        <p className="text-destructive text-sm">
          正しいフィールド番号を入力してください（1以上の整数）
        </p>
      )}

      {isValidInput && filtered.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12">
            <p className="text-muted-foreground text-sm">
              フィールド {fieldId} の検知結果はありません
            </p>
          </CardContent>
        </Card>
      )}

      {isValidInput && filtered.length > 0 && (
        <div className="space-y-2">
          {/* 件数表示 */}
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">
              フィールド {fieldId} の検知結果
            </h2>
            <Badge variant="secondary">{filtered.length}件</Badge>
          </div>

          {/* 結果カードを縦に並べる */}
          <div className="space-y-4">
            {filtered.map((item) => (
              <ResultCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* 初期状態（未入力） */}
      {fieldInput === '' && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12">
            <Search className="text-muted-foreground mb-3 h-10 w-10" />
            <p className="text-muted-foreground text-sm">
              フィールド番号を入力すると、該当する検知結果が表示されます
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// src/constants/mock-dashboard.ts

// フィールドの状態
export interface FieldStatus {
  fieldId: number;
  label: string;
  pendingRepairCount: number; // 修繕待ちの件数
  totalDetections: number;    // 累計検知数
}

// グリッド上でのフィールドの配置
// row, col で位置を指定する（0始まり）
// null のセルは空白になる
export interface FieldPlacement {
  fieldId: number;
  row: number;
  col: number;
}

// フィールドの配置定義
// ここを変えるだけでT字型、L字型、任意の配置にできる
//
// 現在の配置イメージ（T字型の例）:
//
//       [1] [2] [3] [4] [5]
//           [6] [7] [8]
//           [9] [10][11]
//           [12][13][14]
//
export const fieldPlacements: FieldPlacement[] = [
  // 1行目（5列）
  { fieldId: 1,  row: 0, col: 0 },
  { fieldId: 2,  row: 0, col: 1 },
  { fieldId: 3,  row: 0, col: 2 },
  { fieldId: 4,  row: 0, col: 3 },
  { fieldId: 5,  row: 0, col: 4 },
  // 2行目（中央3列のみ → T字の縦棒部分）
  { fieldId: 6,  row: 1, col: 1 },
  { fieldId: 7,  row: 1, col: 2 },
  { fieldId: 8,  row: 1, col: 3 },
  // 3行目
  { fieldId: 9,  row: 2, col: 1 },
  { fieldId: 10, row: 2, col: 2 },
  { fieldId: 11, row: 2, col: 3 },
  // 4行目
  { fieldId: 12, row: 3, col: 1 },
  { fieldId: 13, row: 3, col: 2 },
  { fieldId: 14, row: 3, col: 3 },
];

// フィールドごとのステータス
export const fieldStatuses: FieldStatus[] = [
  { fieldId: 1,  label: 'F-01', pendingRepairCount: 0, totalDetections: 12 },
  { fieldId: 2,  label: 'F-02', pendingRepairCount: 2, totalDetections: 8 },
  { fieldId: 3,  label: 'F-03', pendingRepairCount: 0, totalDetections: 15 },
  { fieldId: 4,  label: 'F-04', pendingRepairCount: 5, totalDetections: 20 },
  { fieldId: 5,  label: 'F-05', pendingRepairCount: 1, totalDetections: 6 },
  { fieldId: 6,  label: 'F-06', pendingRepairCount: 0, totalDetections: 10 },
  { fieldId: 7,  label: 'F-07', pendingRepairCount: 3, totalDetections: 14 },
  { fieldId: 8,  label: 'F-08', pendingRepairCount: 0, totalDetections: 9 },
  { fieldId: 9,  label: 'F-09', pendingRepairCount: 7, totalDetections: 22 },
  { fieldId: 10, label: 'F-10', pendingRepairCount: 0, totalDetections: 5 },
  { fieldId: 11, label: 'F-11', pendingRepairCount: 1, totalDetections: 11 },
  { fieldId: 12, label: 'F-12', pendingRepairCount: 0, totalDetections: 7 },
  { fieldId: 13, label: 'F-13', pendingRepairCount: 4, totalDetections: 18 },
  { fieldId: 14, label: 'F-14', pendingRepairCount: 0, totalDetections: 3 },
];

// ダッシュボード全体の集計
export const dashboardSummary = {
  uncheckedCount: 5,      // 未チェックの検知結果数
  pendingRepairCount: fieldStatuses.reduce(
    (sum, f) => sum + f.pendingRepairCount, 0
  ),
};

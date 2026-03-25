import { useMemo, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

const imageModules = import.meta.glob(
  "/src/assets/field-number/*/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

function getImagesByNumber(value: number): string[] {
  const folderPath = `/src/assets/field-number/${value}/`;

  return Object.entries(imageModules)
    .filter(([path]) => path.startsWith(folderPath))
    .map(([, imagePath]) => imagePath)
    .sort((a, b) => a.localeCompare(b));
}

function SimpleCircle() {
  return (
    <div className="flex items-center justify-center">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="40"
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          className="text-brand-500"
        />
      </svg>
    </div>
  );
}

export default function DetectionResults() {
  const [inputValue, setInputValue] = useState("");
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [hiddenImageUrls, setHiddenImageUrls] = useState<string[]>([]);

  const imageUrls = useMemo(() => {
    if (currentValue === null || Number.isNaN(currentValue)) return [];

    return getImagesByNumber(currentValue).filter(
      (url) => !hiddenImageUrls.includes(url),
    );
  }, [currentValue, hiddenImageUrls]);

  const handleDisplay = () => {
    if (!inputValue.trim()) return;

    const parsedValue = Number(inputValue);
    if (Number.isNaN(parsedValue)) return;

    setCurrentValue(parsedValue);
    setHiddenImageUrls([]);
  };

  const handleDelete = (url: string) => {
    setHiddenImageUrls((prev) => [...prev, url]);
  };

  return (
    <div>
      <PageMeta
        title="Number Image Viewer | TailAdmin"
        description="Display images in a directory mapped by number"
      />
      <PageBreadcrumb pageTitle="Number Image Viewer" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] xl:p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
              数値対応画像ビューア
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              数値を入力すると、対応するディレクトリ内の画像を
              「画像・円・削除ボタン」のセットで縦に表示します。
            </p>
          </div>

          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="数値を入力"
              className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-brand-300 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30"
            />
            <button
              type="button"
              onClick={handleDisplay}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-500 px-5 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600"
            >
              表示
            </button>
          </div>

          <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            {currentValue === null ? (
              "まだ数値が入力されていません。"
            ) : (
              <>
                現在表示中のディレクトリ:
                <span className="ml-2 font-semibold text-gray-800 dark:text-white/90">
                  {currentValue}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {currentValue === null ? (
              <div className="rounded-xl border border-dashed border-gray-300 px-6 py-10 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                数値を入力して「表示」を押してください。
              </div>
            ) : imageUrls.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 px-6 py-10 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                対応するディレクトリに画像が存在しないか、すべて非表示になっています。
              </div>
            ) : (
              imageUrls.map((url, index) => (
                <div
                  key={`${url}-${index}`}
                  className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800"
                >
                  <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[220px_120px_140px]">
                    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
                      <img
                        src={url}
                        alt={`directory-${currentValue}-${index}`}
                        className="h-[160px] w-full object-cover"
                      />
                    </div>

                    <div className="flex justify-center">
                      <SimpleCircle />
                    </div>

                    <div className="flex justify-center md:justify-end">
                      <button
                        type="button"
                        onClick={() => handleDelete(url)}
                        className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 dark:border-red-800 dark:bg-red-500/10 dark:text-red-400"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
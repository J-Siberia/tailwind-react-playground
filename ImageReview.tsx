import { useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

type ReviewStatus = "pending" | "approved" | "rejected";

export default function ImageReview() {
  const [status, setStatus] = useState<ReviewStatus>("pending");

  const leftImageUrl = "/images/fisher/sample-left.png";
  const rightImageUrl = "/images/fisher/sample-right.png";

  return (
    <div>
      <PageMeta
        title="Image Review | TailAdmin"
        description="Two images with approve/reject actions"
      />
      <PageBreadcrumb pageTitle="Image Review" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] xl:p-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
              画像レビュー
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              2つの画像を比較して、承認または否認を選択します。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
              <img
                src={leftImageUrl}
                alt="left sample"
                className="h-[320px] w-full object-cover"
              />
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
              <img
                src={rightImageUrl}
                alt="right sample"
                className="h-[320px] w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setStatus("approved")}
                className="rounded-lg bg-brand-500 px-6 py-3 text-sm font-medium text-white shadow-theme-xs transition hover:bg-brand-600"
              >
                承認
              </button>

              <button
                type="button"
                onClick={() => setStatus("rejected")}
                className="rounded-lg border border-red-300 bg-red-50 px-6 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100 dark:border-red-800 dark:bg-red-500/10 dark:text-red-400"
              >
                否認
              </button>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              現在の状態：
              <span className="ml-2 font-semibold text-gray-800 dark:text-white/90">
                {status === "pending" && "未判定"}
                {status === "approved" && "承認済み"}
                {status === "rejected" && "否認済み"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import Link from "next/link";
import type { Work, Yarn, WorkReferenceUrl } from "@/types/database";

type Props = {
  work: Work;
  yarns: Yarn[];
  referenceUrls: WorkReferenceUrl[];
};

export function WorkDetail({ work, yarns, referenceUrls }: Props) {
  const fields = [
    { label: "カテゴリ", value: work.category_text },
    { label: "作成開始日", value: work.started_at },
    { label: "完成日", value: work.completed_at },
    { label: "所要時間", value: work.estimated_duration_text },
    { label: "その他材料", value: work.other_materials_text },
    { label: "メモ", value: work.memo },
  ];

  return (
    <div className="py-4">
      {/* 画像 */}
      <div className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
        {work.image_url ? (
          <img
            src={work.image_url}
            alt={work.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 3v18" />
          </svg>
        )}
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">{work.name}</h2>

      {/* 基本情報 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
        {fields.map(
          (field) =>
            field.value != null && (
              <div key={field.label} className="flex px-4 py-3">
                <span className="text-sm text-gray-500 w-24 flex-shrink-0">
                  {field.label}
                </span>
                <span className="text-sm text-gray-900 whitespace-pre-wrap">
                  {field.value}
                </span>
              </div>
            )
        )}
      </div>

      {/* 使用した毛糸 */}
      {yarns.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">使用した毛糸</h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {yarns.map((yarn) => (
              <Link
                key={yarn.id}
                href={`/yarns/${yarn.id}`}
                className="flex items-center px-4 py-3 hover:bg-gray-50"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden mr-3 flex items-center justify-center">
                  {yarn.image_url ? (
                    <img
                      src={yarn.image_url}
                      alt={yarn.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{yarn.name}</p>
                  {yarn.brand_name && (
                    <p className="text-xs text-gray-500 truncate">{yarn.brand_name}</p>
                  )}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 参考URL */}
      {referenceUrls.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">参考URL</h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {referenceUrls.map((ref) => (
              <a
                key={ref.id}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 hover:bg-gray-50"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-pink-500 truncate">
                    {ref.title || ref.url}
                  </p>
                  {ref.title && (
                    <p className="text-xs text-gray-500 truncate">{ref.url}</p>
                  )}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      )}

      <Link
        href={`/works/${work.id}/edit`}
        className="block w-full mt-4 py-3 px-4 bg-pink-500 text-white rounded-lg text-center font-medium hover:bg-pink-600"
      >
        編集する
      </Link>
    </div>
  );
}

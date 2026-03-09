import Link from "next/link";
import type { Yarn } from "@/types/database";

type Props = {
  yarn: Yarn;
};

export function YarnDetail({ yarn }: Props) {
  const fields = [
    { label: "ブランド名", value: yarn.brand_name },
    { label: "色名", value: yarn.color_name },
    { label: "色番", value: yarn.color_code },
    { label: "ロット番号", value: yarn.lot_number },
    { label: "購入日", value: yarn.purchase_date },
    { label: "購入場所", value: yarn.purchase_place },
    {
      label: "価格",
      value: yarn.price_per_ball != null ? `${yarn.price_per_ball}円/玉` : null,
    },
    {
      label: "重さ",
      value: yarn.weight_g != null ? `${yarn.weight_g}g` : null,
    },
    {
      label: "長さ",
      value: yarn.length_m != null ? `${yarn.length_m}m` : null,
    },
    { label: "素材", value: yarn.material_text },
    { label: "残り玉数", value: `${yarn.current_quantity} 玉` },
    { label: "メモ", value: yarn.memo },
  ];

  return (
    <div className="py-4">
      {/* 画像 */}
      <div className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
        {yarn.image_url ? (
          <img
            src={yarn.image_url}
            alt={yarn.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3c-2 3-3 6-3 9s1 6 3 9M12 3c2 3 3 6 3 9s-1 6-3 9M3 12h18" />
          </svg>
        )}
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">{yarn.name}</h2>

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

      <Link
        href={`/yarns/${yarn.id}/edit`}
        className="block w-full mt-4 py-3 px-4 bg-pink-500 text-white rounded-lg text-center font-medium hover:bg-pink-600"
      >
        編集する
      </Link>
    </div>
  );
}

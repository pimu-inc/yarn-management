import Link from "next/link";
import type { Yarn } from "@/types/database";
import { QuantityIcon } from "./quantity-icon";

type Props = {
  yarn: Yarn;
};

export function YarnCard({ yarn }: Props) {
  return (
    <Link href={`/yarns/${yarn.id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex">
          {/* 画像エリア */}
          <div className="w-24 h-24 bg-gray-100 flex-shrink-0 flex items-center justify-center">
            {yarn.image_url ? (
              <img
                src={yarn.image_url}
                alt={yarn.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3c-2 3-3 6-3 9s1 6 3 9M12 3c2 3 3 6 3 9s-1 6-3 9M3 12h18" />
              </svg>
            )}
          </div>
          {/* 情報エリア */}
          <div className="flex-1 p-3 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{yarn.name}</h3>
            {yarn.brand_name && (
              <p className="text-xs text-gray-500 mt-0.5 truncate">{yarn.brand_name}</p>
            )}
            <div className="mt-1.5">
              <QuantityIcon quantity={yarn.current_quantity} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

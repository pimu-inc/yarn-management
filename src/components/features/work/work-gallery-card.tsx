import Link from "next/link";
import type { Work } from "@/types/database";

type Props = {
  work: Work;
};

export function WorkGalleryCard({ work }: Props) {
  return (
    <Link href={`/works/${work.id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="aspect-square bg-gray-100 flex items-center justify-center">
          {work.image_url ? (
            <img
              src={work.image_url}
              alt={work.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 3v18" />
            </svg>
          )}
        </div>
        <div className="p-2">
          <h3 className="text-sm font-medium text-gray-900 truncate">{work.name}</h3>
          {work.category_text && (
            <p className="text-xs text-gray-500 truncate">{work.category_text}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

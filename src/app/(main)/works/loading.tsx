import { GallerySkeleton } from "@/components/ui/loading";

export default function WorksLoading() {
  return (
    <div className="py-4">
      <div className="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse" />
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <GallerySkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

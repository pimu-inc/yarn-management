import { CardSkeleton } from "@/components/ui/loading";

export default function YarnsLoading() {
  return (
    <div className="py-4">
      <div className="h-6 bg-gray-200 rounded w-24 mb-4 animate-pulse" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

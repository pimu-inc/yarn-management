import { getWorks } from "@/lib/supabase/works";
import { WorkGalleryCard } from "@/components/features/work/work-gallery-card";
import { Fab } from "@/components/ui/fab";

export default async function WorksPage() {
  const works = await getWorks();

  return (
    <div className="py-4">
      <h2 className="text-lg font-bold mb-4">作品一覧</h2>
      {works.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-8">
          作品はまだ登録されていません
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {works.map((work) => (
            <WorkGalleryCard key={work.id} work={work} />
          ))}
        </div>
      )}
      <Fab href="/works/new" />
    </div>
  );
}

import { getYarns } from "@/lib/supabase/yarns";
import { YarnCard } from "@/components/features/yarn/yarn-card";
import { Fab } from "@/components/ui/fab";

export default async function YarnsPage() {
  const yarns = await getYarns();

  return (
    <div className="py-4">
      <h2 className="text-lg font-bold mb-4">毛糸一覧</h2>
      {yarns.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-8">
          毛糸はまだ登録されていません
        </p>
      ) : (
        <div className="space-y-3">
          {yarns.map((yarn) => (
            <YarnCard key={yarn.id} yarn={yarn} />
          ))}
        </div>
      )}
      <Fab href="/yarns/new" />
    </div>
  );
}

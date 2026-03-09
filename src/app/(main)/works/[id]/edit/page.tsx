import { notFound } from "next/navigation";
import { getWork } from "@/lib/supabase/works";
import { getWorkYarns } from "@/lib/supabase/work-yarns";
import { getWorkReferenceUrls } from "@/lib/supabase/work-reference-urls";
import { WorkForm } from "@/components/features/work/work-form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditWorkPage({ params }: Props) {
  const { id } = await params;
  const work = await getWork(id);

  if (!work) notFound();

  const [workYarns, referenceUrls] = await Promise.all([
    getWorkYarns(id),
    getWorkReferenceUrls(id),
  ]);

  return (
    <div>
      <h2 className="text-lg font-bold pt-4">作品を編集</h2>
      <WorkForm
        work={work}
        initialYarnIds={workYarns.map((wy) => wy.yarn_id)}
        initialReferenceUrls={referenceUrls}
      />
    </div>
  );
}

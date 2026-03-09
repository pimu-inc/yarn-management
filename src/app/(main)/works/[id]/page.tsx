import { notFound } from "next/navigation";
import { getWork } from "@/lib/supabase/works";
import { getWorkYarns } from "@/lib/supabase/work-yarns";
import { getWorkReferenceUrls } from "@/lib/supabase/work-reference-urls";
import { WorkDetail } from "@/components/features/work/work-detail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function WorkDetailPage({ params }: Props) {
  const { id } = await params;
  const work = await getWork(id);

  if (!work) notFound();

  const [workYarns, referenceUrls] = await Promise.all([
    getWorkYarns(id),
    getWorkReferenceUrls(id),
  ]);

  const yarns = workYarns.map((wy) => wy.yarn);

  return <WorkDetail work={work} yarns={yarns} referenceUrls={referenceUrls} />;
}

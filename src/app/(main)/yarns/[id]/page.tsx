import { notFound } from "next/navigation";
import { getYarn } from "@/lib/supabase/yarns";
import { YarnDetail } from "@/components/features/yarn/yarn-detail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function YarnDetailPage({ params }: Props) {
  const { id } = await params;
  const yarn = await getYarn(id);

  if (!yarn) notFound();

  return <YarnDetail yarn={yarn} />;
}

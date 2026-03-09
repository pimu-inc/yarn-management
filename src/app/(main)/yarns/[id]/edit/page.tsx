import { notFound } from "next/navigation";
import { getYarn } from "@/lib/supabase/yarns";
import { YarnForm } from "@/components/features/yarn/yarn-form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditYarnPage({ params }: Props) {
  const { id } = await params;
  const yarn = await getYarn(id);

  if (!yarn) notFound();

  return (
    <div>
      <h2 className="text-lg font-bold pt-4">毛糸を編集</h2>
      <YarnForm yarn={yarn} />
    </div>
  );
}

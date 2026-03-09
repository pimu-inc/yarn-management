import { createClient } from "./server";
import type { WorkReferenceUrl } from "@/types/database";

export async function getWorkReferenceUrls(
  workId: string
): Promise<WorkReferenceUrl[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("work_reference_urls")
    .select("*")
    .eq("work_id", workId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

export async function setWorkReferenceUrls(
  workId: string,
  urls: { title: string | null; url: string }[]
) {
  const supabase = await createClient();

  // 全削除
  const { error: deleteError } = await supabase
    .from("work_reference_urls")
    .delete()
    .eq("work_id", workId);

  if (deleteError) throw deleteError;

  // 再INSERT
  if (urls.length > 0) {
    const rows = urls.map((u) => ({ work_id: workId, ...u }));
    const { error: insertError } = await supabase
      .from("work_reference_urls")
      .insert(rows);

    if (insertError) throw insertError;
  }
}

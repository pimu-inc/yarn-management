import { createClient } from "./server";
import type { WorkYarn, Yarn } from "@/types/database";

export async function getWorkYarns(workId: string): Promise<(WorkYarn & { yarn: Yarn })[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("work_yarns")
    .select("*, yarn:yarns(*)")
    .eq("work_id", workId);

  if (error) throw error;
  return data as (WorkYarn & { yarn: Yarn })[];
}

export async function setWorkYarns(workId: string, yarnIds: string[]) {
  const supabase = await createClient();

  // 全削除
  const { error: deleteError } = await supabase
    .from("work_yarns")
    .delete()
    .eq("work_id", workId);

  if (deleteError) throw deleteError;

  // 再INSERT
  if (yarnIds.length > 0) {
    const rows = yarnIds.map((yarn_id) => ({ work_id: workId, yarn_id }));
    const { error: insertError } = await supabase
      .from("work_yarns")
      .insert(rows);

    if (insertError) throw insertError;
  }
}

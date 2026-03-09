import { createClient } from "./server";
import type { Work } from "@/types/database";

export async function getWorks(): Promise<Work[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("works")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getWork(id: string): Promise<Work | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("works")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data;
}

export async function createWork(
  work: Omit<Work, "id" | "user_id" | "created_at" | "updated_at">
): Promise<Work> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("未認証");

  const { data, error } = await supabase
    .from("works")
    .insert({ ...work, user_id: user.id })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateWork(
  id: string,
  work: Partial<Omit<Work, "id" | "user_id" | "created_at" | "updated_at">>
): Promise<Work> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("works")
    .update(work)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

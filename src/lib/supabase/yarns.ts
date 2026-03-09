import { createClient } from "./server";
import type { Yarn } from "@/types/database";

export async function getYarns(): Promise<Yarn[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("yarns")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getYarn(id: string): Promise<Yarn | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("yarns")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }
  return data;
}

export async function createYarn(
  yarn: Omit<Yarn, "id" | "user_id" | "created_at" | "updated_at">
): Promise<Yarn> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("未認証");

  const { data, error } = await supabase
    .from("yarns")
    .insert({ ...yarn, user_id: user.id })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateYarn(
  id: string,
  yarn: Partial<Omit<Yarn, "id" | "user_id" | "created_at" | "updated_at">>
): Promise<Yarn> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("yarns")
    .update(yarn)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

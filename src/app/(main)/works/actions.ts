"use server";

import { redirect } from "next/navigation";
import { createWork, updateWork } from "@/lib/supabase/works";
import { setWorkYarns } from "@/lib/supabase/work-yarns";
import { setWorkReferenceUrls } from "@/lib/supabase/work-reference-urls";

export async function createWorkAction(formData: FormData) {
  const work = extractWorkFromFormData(formData);
  const created = await createWork(work);

  // 毛糸紐づけ
  const yarnIds = JSON.parse((formData.get("yarn_ids") as string) || "[]");
  await setWorkYarns(created.id, yarnIds);

  // 参考URL
  const referenceUrls = JSON.parse(
    (formData.get("reference_urls") as string) || "[]"
  );
  await setWorkReferenceUrls(created.id, referenceUrls);

  redirect("/works");
}

export async function updateWorkAction(formData: FormData) {
  const id = formData.get("id") as string;
  const work = extractWorkFromFormData(formData);
  await updateWork(id, work);

  // 毛糸紐づけ
  const yarnIds = JSON.parse((formData.get("yarn_ids") as string) || "[]");
  await setWorkYarns(id, yarnIds);

  // 参考URL
  const referenceUrls = JSON.parse(
    (formData.get("reference_urls") as string) || "[]"
  );
  await setWorkReferenceUrls(id, referenceUrls);

  redirect(`/works/${id}`);
}

function extractWorkFromFormData(formData: FormData) {
  return {
    name: formData.get("name") as string,
    image_url: (formData.get("image_url") as string) || null,
    category_text: (formData.get("category_text") as string) || null,
    started_at: (formData.get("started_at") as string) || null,
    completed_at: (formData.get("completed_at") as string) || null,
    estimated_duration_text:
      (formData.get("estimated_duration_text") as string) || null,
    other_materials_text:
      (formData.get("other_materials_text") as string) || null,
    memo: (formData.get("memo") as string) || null,
  };
}

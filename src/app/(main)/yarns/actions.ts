"use server";

import { redirect } from "next/navigation";
import { createYarn, updateYarn } from "@/lib/supabase/yarns";

export async function createYarnAction(formData: FormData) {
  const yarn = extractYarnFromFormData(formData);
  await createYarn(yarn);
  redirect("/yarns");
}

export async function updateYarnAction(formData: FormData) {
  const id = formData.get("id") as string;
  const yarn = extractYarnFromFormData(formData);
  await updateYarn(id, yarn);
  redirect(`/yarns/${id}`);
}

function extractYarnFromFormData(formData: FormData) {
  return {
    name: formData.get("name") as string,
    brand_name: (formData.get("brand_name") as string) || null,
    color_name: (formData.get("color_name") as string) || null,
    color_code: (formData.get("color_code") as string) || null,
    lot_number: (formData.get("lot_number") as string) || null,
    purchase_date: (formData.get("purchase_date") as string) || null,
    purchase_place: (formData.get("purchase_place") as string) || null,
    price_per_ball: formData.get("price_per_ball")
      ? Number(formData.get("price_per_ball"))
      : null,
    weight_g: formData.get("weight_g")
      ? Number(formData.get("weight_g"))
      : null,
    length_m: formData.get("length_m")
      ? Number(formData.get("length_m"))
      : null,
    material_text: (formData.get("material_text") as string) || null,
    current_quantity: Number(formData.get("current_quantity")) || 0,
    memo: (formData.get("memo") as string) || null,
    image_url: (formData.get("image_url") as string) || null,
  };
}

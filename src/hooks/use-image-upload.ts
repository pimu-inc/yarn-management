"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/supabase/storage";
import { createClient } from "@/lib/supabase/client";

export function useImageUpload(folder: string) {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  async function upload(file: File): Promise<string | null> {
    setUploading(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("未認証");

      const url = await uploadImage(file, user.id, folder);
      setImageUrl(url);
      return url;
    } catch (error) {
      console.error("画像アップロードエラー:", error);
      return null;
    } finally {
      setUploading(false);
    }
  }

  return { upload, uploading, imageUrl, setImageUrl };
}

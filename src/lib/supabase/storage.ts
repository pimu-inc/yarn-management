import { createClient } from "./client";

// 画像をリサイズしてBlobに変換
async function resizeImage(file: File, maxSize: number = 800): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = img;

      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = (height / width) * maxSize;
          width = maxSize;
        } else {
          width = (width / height) * maxSize;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("画像の変換に失敗しました"));
        },
        "image/jpeg",
        0.85
      );
    };
    img.onerror = () => reject(new Error("画像の読み込みに失敗しました"));
    img.src = URL.createObjectURL(file);
  });
}

export async function uploadImage(
  file: File,
  userId: string,
  folder: string
): Promise<string> {
  const supabase = createClient();
  const resized = await resizeImage(file);
  const ext = "jpg";
  const fileName = `${userId}/${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(fileName, resized, {
      contentType: "image/jpeg",
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("images").getPublicUrl(fileName);

  return publicUrl;
}

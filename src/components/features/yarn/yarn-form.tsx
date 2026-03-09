"use client";

import { useState } from "react";
import type { Yarn } from "@/types/database";
import { createYarnAction, updateYarnAction } from "@/app/(main)/yarns/actions";
import { ImagePicker } from "@/components/ui/image-picker";
import { useImageUpload } from "@/hooks/use-image-upload";

type Props = {
  yarn?: Yarn;
};

export function YarnForm({ yarn }: Props) {
  const [loading, setLoading] = useState(false);
  const isEdit = !!yarn;
  const { upload, uploading, imageUrl, setImageUrl } = useImageUpload("yarns");

  // 初期値設定
  if (yarn?.image_url && imageUrl === null) {
    setImageUrl(yarn.image_url);
  }

  async function handleFileSelect(file: File) {
    await upload(file);
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    // image_urlをアップロード結果で上書き
    formData.set("image_url", imageUrl || "");
    if (isEdit) {
      await updateYarnAction(formData);
    } else {
      await createYarnAction(formData);
    }
  }

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent";

  return (
    <form action={handleSubmit} className="space-y-4 py-4">
      {isEdit && <input type="hidden" name="id" value={yarn.id} />}

      <ImagePicker
        imageUrl={imageUrl || yarn?.image_url || null}
        uploading={uploading}
        onFileSelect={handleFileSelect}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          毛糸名 <span className="text-red-500">*</span>
        </label>
        <input name="name" required defaultValue={yarn?.name} className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ブランド名 / メーカー名
        </label>
        <input name="brand_name" defaultValue={yarn?.brand_name || ""} className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">色名</label>
          <input name="color_name" defaultValue={yarn?.color_name || ""} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">色番</label>
          <input name="color_code" defaultValue={yarn?.color_code || ""} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ロット番号</label>
        <input name="lot_number" defaultValue={yarn?.lot_number || ""} className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">購入日</label>
          <input name="purchase_date" type="date" defaultValue={yarn?.purchase_date || ""} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">購入場所</label>
          <input name="purchase_place" defaultValue={yarn?.purchase_place || ""} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">価格(円/玉)</label>
          <input name="price_per_ball" type="number" step="1" defaultValue={yarn?.price_per_ball ?? ""} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">重さ(g)</label>
          <input name="weight_g" type="number" step="0.1" defaultValue={yarn?.weight_g ?? ""} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">長さ(m)</label>
          <input name="length_m" type="number" step="0.1" defaultValue={yarn?.length_m ?? ""} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">素材</label>
        <input name="material_text" defaultValue={yarn?.material_text || ""} className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          所有数（玉） <span className="text-red-500">*</span>
        </label>
        <input name="current_quantity" type="number" step="0.1" required defaultValue={yarn?.current_quantity ?? 0} className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">メモ</label>
        <textarea name="memo" rows={3} defaultValue={yarn?.memo || ""} className={inputClass} />
      </div>

      <button
        type="submit"
        disabled={loading || uploading}
        className="w-full py-3 px-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 font-medium"
      >
        {loading ? "保存中..." : isEdit ? "更新する" : "登録する"}
      </button>
    </form>
  );
}

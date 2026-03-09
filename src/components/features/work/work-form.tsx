"use client";

import { useState } from "react";
import type { Work, WorkReferenceUrl } from "@/types/database";
import { createWorkAction, updateWorkAction } from "@/app/(main)/works/actions";
import { ImagePicker } from "@/components/ui/image-picker";
import { useImageUpload } from "@/hooks/use-image-upload";
import { YarnSelector } from "./yarn-selector";
import { ReferenceUrlList } from "./reference-url-list";

type Props = {
  work?: Work;
  initialYarnIds?: string[];
  initialReferenceUrls?: WorkReferenceUrl[];
};

export function WorkForm({ work, initialYarnIds = [], initialReferenceUrls = [] }: Props) {
  const [loading, setLoading] = useState(false);
  const isEdit = !!work;
  const { upload, uploading, imageUrl, setImageUrl } = useImageUpload("works");
  const [selectedYarnIds, setSelectedYarnIds] = useState<string[]>(initialYarnIds);
  const [referenceUrls, setReferenceUrls] = useState(
    initialReferenceUrls.map((u) => ({ title: u.title || "", url: u.url }))
  );

  if (work?.image_url && imageUrl === null) {
    setImageUrl(work.image_url);
  }

  async function handleFileSelect(file: File) {
    await upload(file);
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    formData.set("image_url", imageUrl || "");
    formData.set("yarn_ids", JSON.stringify(selectedYarnIds));
    // URLが空でないもののみ送信
    const validUrls = referenceUrls.filter((u) => u.url.trim() !== "");
    formData.set("reference_urls", JSON.stringify(validUrls));

    if (isEdit) {
      await updateWorkAction(formData);
    } else {
      await createWorkAction(formData);
    }
  }

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent";

  return (
    <form action={handleSubmit} className="space-y-4 py-4">
      {isEdit && <input type="hidden" name="id" value={work.id} />}

      <ImagePicker
        imageUrl={imageUrl || work?.image_url || null}
        uploading={uploading}
        onFileSelect={handleFileSelect}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          作品名 <span className="text-red-500">*</span>
        </label>
        <input name="name" required defaultValue={work?.name} className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">カテゴリ</label>
        <input name="category_text" defaultValue={work?.category_text || ""} className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">作成開始日</label>
          <input name="started_at" type="date" defaultValue={work?.started_at || ""} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">完成日</label>
          <input name="completed_at" type="date" defaultValue={work?.completed_at || ""} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">大体の所要時間</label>
        <input
          name="estimated_duration_text"
          defaultValue={work?.estimated_duration_text || ""}
          placeholder="例: 2週間、約10時間"
          className={inputClass}
        />
      </div>

      <YarnSelector
        selectedYarnIds={selectedYarnIds}
        onChange={setSelectedYarnIds}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">その他材料</label>
        <textarea
          name="other_materials_text"
          rows={2}
          defaultValue={work?.other_materials_text || ""}
          className={inputClass}
        />
      </div>

      <ReferenceUrlList urls={referenceUrls} onChange={setReferenceUrls} />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">メモ</label>
        <textarea name="memo" rows={3} defaultValue={work?.memo || ""} className={inputClass} />
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

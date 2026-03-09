"use client";

import { useRef } from "react";

type Props = {
  imageUrl: string | null;
  uploading: boolean;
  onFileSelect: (file: File) => void;
};

export function ImagePicker({ imageUrl, uploading, onFileSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">写真</label>
      <div
        onClick={() => inputRef.current?.click()}
        className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-300 hover:border-pink-400 transition-colors"
      >
        {uploading ? (
          <div className="text-sm text-gray-500">アップロード中...</div>
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt="プレビュー"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
            <p className="text-sm">タップして写真を選択</p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}

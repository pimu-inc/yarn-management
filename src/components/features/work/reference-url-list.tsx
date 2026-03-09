"use client";

type ReferenceUrl = {
  title: string;
  url: string;
};

type Props = {
  urls: ReferenceUrl[];
  onChange: (urls: ReferenceUrl[]) => void;
};

export function ReferenceUrlList({ urls, onChange }: Props) {
  function addUrl() {
    onChange([...urls, { title: "", url: "" }]);
  }

  function removeUrl(index: number) {
    onChange(urls.filter((_, i) => i !== index));
  }

  function updateUrl(index: number, field: "title" | "url", value: string) {
    const updated = urls.map((u, i) =>
      i === index ? { ...u, [field]: value } : u
    );
    onChange(updated);
  }

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm";

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        参考URL
      </label>
      <div className="space-y-3">
        {urls.map((u, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3 space-y-2">
            <input
              placeholder="タイトル"
              value={u.title}
              onChange={(e) => updateUrl(index, "title", e.target.value)}
              className={inputClass}
            />
            <div className="flex gap-2">
              <input
                placeholder="URL"
                type="url"
                value={u.url}
                onChange={(e) => updateUrl(index, "url", e.target.value)}
                className={`${inputClass} flex-1`}
              />
              <button
                type="button"
                onClick={() => removeUrl(index)}
                className="text-red-400 hover:text-red-600 px-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addUrl}
        className="mt-2 text-sm text-pink-500 hover:text-pink-600 font-medium"
      >
        + URLを追加
      </button>
    </div>
  );
}

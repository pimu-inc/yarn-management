"use client";

import { useState, useEffect } from "react";
import type { Yarn } from "@/types/database";
import { createClient } from "@/lib/supabase/client";

type Props = {
  selectedYarnIds: string[];
  onChange: (yarnIds: string[]) => void;
};

export function YarnSelector({ selectedYarnIds, onChange }: Props) {
  const [yarns, setYarns] = useState<Yarn[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchYarns() {
      const supabase = createClient();
      const { data } = await supabase
        .from("yarns")
        .select("*")
        .order("created_at", { ascending: false });
      setYarns(data || []);
      setLoading(false);
    }
    fetchYarns();
  }, []);

  function toggleYarn(yarnId: string) {
    if (selectedYarnIds.includes(yarnId)) {
      onChange(selectedYarnIds.filter((id) => id !== yarnId));
    } else {
      onChange([...selectedYarnIds, yarnId]);
    }
  }

  if (loading) {
    return <p className="text-sm text-gray-500">読み込み中...</p>;
  }

  if (yarns.length === 0) {
    return <p className="text-sm text-gray-500">登録済みの毛糸がありません</p>;
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        使用した毛糸
      </label>
      <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-2">
        {yarns.map((yarn) => (
          <label
            key={yarn.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedYarnIds.includes(yarn.id)}
              onChange={() => toggleYarn(yarn.id)}
              className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">
                {yarn.name}
              </p>
              {yarn.brand_name && (
                <p className="text-xs text-gray-500 truncate">{yarn.brand_name}</p>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

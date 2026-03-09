"use client";

import { useState } from "react";
import Link from "next/link";
import { signup } from "@/app/(auth)/signup/actions";

export function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await signup(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">会員登録</h1>
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            メールアドレス
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            パスワード
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 font-medium"
        >
          {loading ? "登録中..." : "登録する"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        アカウントをお持ちの方は
        <Link href="/login" className="text-pink-500 hover:underline ml-1">
          ログイン
        </Link>
      </p>
    </div>
  );
}

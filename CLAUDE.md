# 編み物ユーザー向け 毛糸在庫・作品管理システム

## プロジェクト概要
編み物を趣味とするユーザーが、毛糸在庫と完成作品をスマホ中心で管理できるWebアプリ。
詳細な要件定義は `docs/requirements.md` を参照。

## 技術スタック
- **フレームワーク**: Next.js (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **バックエンド / DB / 認証 / ストレージ**: Supabase
- **パッケージマネージャ**: npm

## プロジェクト構成
```
src/
├── app/                  # Next.js App Router
│   ├── (auth)/           # 認証関連ページ（ログイン・会員登録）
│   ├── (main)/           # 認証後ページ（毛糸一覧・作品一覧など）
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/               # 汎用UIコンポーネント
│   └── features/         # 機能別コンポーネント（yarn/, work/）
├── lib/
│   ├── supabase/         # Supabaseクライアント設定
│   └── utils/            # ユーティリティ関数
├── types/                # 型定義
└── hooks/                # カスタムフック
```

## データモデル（Supabaseテーブル）
- `yarns` - 毛糸
- `works` - 作品
- `work_yarns` - 作品と毛糸の中間テーブル
- `work_reference_urls` - 作品の参考URL
- ユーザーは Supabase Auth で管理（`auth.users`）

## コーディング規約
- コンポーネントは関数コンポーネント + React Hooks で記述
- 命名: コンポーネントは PascalCase、関数・変数は camelCase、ファイル名は kebab-case
- Supabase のクエリは `lib/supabase/` 内にまとめる
- すべてのデータ取得には RLS（Row Level Security）による user_id フィルタを前提とする
- 日本語UIテキストはコンポーネント内に直接記述（i18n不要）
- コメントは日本語で記述

## 画面一覧
1. 会員登録画面 `/signup`
2. ログイン画面 `/login`
3. 毛糸一覧画面 `/yarns`（ログイン後の初期表示）
4. 毛糸詳細画面 `/yarns/[id]`
5. 毛糸新規登録画面 `/yarns/new`
6. 毛糸編集画面 `/yarns/[id]/edit`
7. 作品一覧画面 `/works`
8. 作品詳細画面 `/works/[id]`
9. 作品新規登録画面 `/works/new`
10. 作品編集画面 `/works/[id]/edit`

## UI方針
- モバイルファースト設計
- ボトムナビゲーションで「毛糸一覧」「作品一覧」を切り替え
- 毛糸一覧: 写真付きカード形式、残り玉数をアイコンで視覚表現
- 作品一覧: ギャラリー形式

## 開発時の注意事項
- 初期リリースでは削除機能は不要
- 検索・絞り込み機能は不要
- 毛糸在庫の自動減算は行わない（手動管理）
- 画像は写真ライブラリからの選択のみ（カメラ撮影非対応）
- 1レコードにつき画像は1枚まで

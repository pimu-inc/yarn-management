# けいと帳 — 毛糸在庫・作品管理アプリ

編み物ユーザー向けの毛糸在庫・完成作品管理Webアプリケーションです。
スマートフォンでの操作を前提としたモバイルファースト設計で、手持ちの毛糸や作品を手軽に記録・管理できます。

## 主な機能

- **毛糸在庫管理** — 毛糸の登録・編集、残り玉数の視覚的な表示
- **作品管理** — 完成作品をギャラリー形式で一覧表示
- **毛糸と作品の紐づけ** — 作品に使用した毛糸を記録
- **参考URL管理** — 作品作成時に参考にした動画やサイトのURLを保存
- **画像管理** — 毛糸・作品の写真をアップロード（自動リサイズ対応）
- **ユーザー認証** — メールアドレス・パスワードによる会員登録・ログイン

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | [Next.js](https://nextjs.org/) (App Router) |
| 言語 | TypeScript |
| スタイリング | [Tailwind CSS](https://tailwindcss.com/) |
| バックエンド / DB / 認証 / ストレージ | [Supabase](https://supabase.com/) |

## アーキテクチャ

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # 認証ページ（ログイン・会員登録）
│   └── (main)/             # メインページ（毛糸・作品管理）
├── components/
│   ├── ui/                 # 汎用UIコンポーネント
│   └── features/           # 機能別コンポーネント
├── lib/supabase/           # Supabase クライアント・データ操作
├── types/                  # 型定義
└── hooks/                  # カスタムフック
```

## データモデル

```
auth.users（Supabase Auth）
    │
    ├── yarns（毛糸）
    │
    └── works（作品）
          ├── work_yarns（使用毛糸の紐づけ）
          └── work_reference_urls（参考URL）
```

- すべてのテーブルに RLS（Row Level Security）を適用し、ユーザーごとのデータ分離を実現

## セットアップ

### 前提条件

- Node.js 18+
- Supabase プロジェクト

### 手順

```bash
# 依存パッケージのインストール
npm install

# 環境変数の設定
cp env.example .env.local
# .env.local に Supabase の URL と ANON KEY を設定

# Supabase でテーブル作成
# docs/schema.sql を Supabase SQL Editor で実行

# 開発サーバー起動
npm run dev
```

## 画面一覧

| 画面 | パス | 説明 |
|------|------|------|
| 会員登録 | `/signup` | メール・パスワードで登録 |
| ログイン | `/login` | ログイン |
| 毛糸一覧 | `/yarns` | カード形式、残り玉数アイコン表示 |
| 毛糸詳細 | `/yarns/[id]` | 全項目表示 |
| 毛糸登録 | `/yarns/new` | 新規登録フォーム |
| 毛糸編集 | `/yarns/[id]/edit` | 編集フォーム |
| 作品一覧 | `/works` | 2カラムギャラリー形式 |
| 作品詳細 | `/works/[id]` | 使用毛糸・参考URL表示 |
| 作品登録 | `/works/new` | 新規登録フォーム |
| 作品編集 | `/works/[id]/edit` | 編集フォーム |

## ライセンス

MIT

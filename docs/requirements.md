# cloud.markdown

## 1. Overview

### System Name
編み物ユーザー向け 毛糸在庫・作品管理システム

### Purpose
本システムは、編み物を趣味とする一般ユーザーが、自身の毛糸在庫および完成作品をスマートフォン中心で管理できるWebアプリを提供することを目的とする。

主な目的は以下の通り。

- 手元の毛糸在庫を把握する
- 購入済みの毛糸の残数を管理する
- 作品ごとに使用した毛糸を記録する
- 毛糸の色番およびロット番号を管理する
- 作品作成時に参考にした動画やサイトURLを管理する

---

## 2. Target Users

- 一般の編み物ユーザー
- 個人利用を前提とするユーザー
- 他ユーザーとの共有・公開は行わず、自分専用データを管理したいユーザー

---

## 3. Release Scope

### Initial Release Platform
- スマホ中心のWebアプリ
- ブラウザで利用可能
- 画像登録は写真ライブラリからの選択のみ対応

### Authentication
- メールアドレス + パスワードによる会員登録
- メールアドレス + パスワードによるログイン
- パスワード再設定機能は初期リリースでは不要

### Navigation
- ログイン後の初期表示は毛糸一覧画面
- ボトムナビゲーションで以下を切り替える
  - 毛糸一覧
  - 作品一覧

---

## 4. Functional Requirements

## 4.1 User Authentication

### Required Features
- 会員登録
- ログイン

### Registration Items
- メールアドレス
- パスワード

### Notes
- 表示名、ニックネームなどは初期リリースでは不要
- 公開プロフィール機能は不要

---

## 4.2 Yarn Management

### Purpose
ユーザーが所有する毛糸を登録・閲覧・編集し、現在の残り玉数を管理できるようにする。

### Yarn List Screen
#### Display Format
- 写真付きカード形式
- 残り玉数アイコンが大きく見えるUI

#### Display Items
- 写真
- 毛糸名
- 残り玉数アイコン

#### Sort Order
- 新しい順

#### Actions
- 一覧画面上に「＋」ボタンを配置し、新規登録画面へ遷移できる

### Yarn Detail Screen
- 登録されている全項目を表示する

### Yarn Create / Edit Screen

#### Required Fields
- 毛糸名
- ブランド名 / メーカー名
- 色名
- 色番
- ロット番号
- 購入日
- 購入場所
- 価格（1玉あたり）
- 重さ（g）
- 長さ（m）
- 素材
- 所有数（初期玉数）
- メモ
- 写真

#### Field Specifications
- 素材: 自由入力
- 写真: 1件につき1枚
- 価格: 1玉ごとの価格
- 所有数: 数値入力
- 玉数は小数対応あり

### Inventory Management Rules
- 在庫は「玉数」のみで管理する
- 例:
  - 5玉購入した場合は初期値を `5`
  - 1玉使ったら `4`
  - 半玉使ったら `3.5`
- 未使用 / 使用中 / 使い切り などの独立したステータスは持たない
- 状態の解釈は残り玉数によってユーザーが把握する
- 視覚的にわかりやすくするため、残り玉数をアイコンで表現する

### Edit / Delete Policy
- 初期リリースでは編集のみ可能
- 削除機能は不要

### Search / Filter
- 初期リリースでは検索機能不要
- 絞り込み機能も不要

---

## 4.3 Project / Finished Works Management

### Purpose
ユーザーが完成した作品を登録し、使用した毛糸や参考URLを記録できるようにする。

### Registration Timing
- 作品は制作後にのみ登録する
- 制作中管理は行わない
- 制作ステータス（未着手 / 制作中 / 完成）は不要

### Work List Screen
#### Display Format
- 完成作品がギャラリーのように並ぶ形式

#### Sort Order
- 新しい順

#### Actions
- 一覧画面上に「＋」ボタンを配置し、新規登録画面へ遷移できる

### Work Detail Screen
- 作品の登録内容を表示する
- 参考URLを一覧表示する
- 参考URLをタップすると外部サイトへ遷移できる

### Work Create / Edit Screen

#### Required Fields
- 作品名
- 作品の写真
- 作品カテゴリ
- 作成開始日
- 完成日
- 大体の所要時間
- 使用した毛糸
- その他材料
- 参考URL
- メモ

#### Field Specifications
- 写真: 1件につき1枚
- 作品カテゴリ: 自由入力
- 使用した毛糸:
  - 登録済み毛糸から選択
  - 複数選択可能
- その他材料:
  - 自由入力メモ
- メモ:
  - 使用した毛糸の量などもここに記録する

### Relationship Between Works and Yarn Inventory
- 作品に毛糸を紐づけても、毛糸在庫は自動減算しない
- 在庫数の更新は別操作で手動管理する

---

## 4.4 Reference URL Management

### Purpose
作品作成時に参考にした動画やサイトのURLを記録する。

### Requirements
- 1作品に対して参考URLを複数登録可能
- 各URLにはタイトルを付与可能
- 作品詳細画面で一覧表示する
- タップで外部サイトへ遷移できる

### URL Item Structure
- タイトル
- URL

---

## 5. Screen Requirements

### Required Screens in Initial Release
- 会員登録画面
- ログイン画面
- 毛糸一覧画面
- 毛糸詳細画面
- 毛糸新規登録画面
- 毛糸編集画面
- 作品一覧画面
- 作品詳細画面
- 作品新規登録画面
- 作品編集画面

---

## 6. Data Model Draft

## 6.1 User
- id
- email
- password_hash
- created_at
- updated_at

## 6.2 Yarn
- id
- user_id
- name
- brand_name
- color_name
- color_code
- lot_number
- purchase_date
- purchase_place
- price_per_ball
- weight_g
- length_m
- material_text
- current_quantity
- memo
- image_url
- created_at
- updated_at

## 6.3 Work
- id
- user_id
- name
- image_url
- category_text
- started_at
- completed_at
- estimated_duration_text
- other_materials_text
- memo
- created_at
- updated_at

## 6.4 WorkYarn
- id
- work_id
- yarn_id
- created_at

## 6.5 WorkReferenceUrl
- id
- work_id
- title
- url
- created_at
- updated_at

---

## 7. Non-Functional Requirements

### Usability
- スマホでの操作性を最優先とする
- 毛糸在庫の視認性を高める
- 一覧画面は直感的に内容が理解できるUIとする

### Performance
- 一覧画面はストレスなく表示できること
- 画像付きカード表示でもスマホで実用的な速度を維持すること

### Security
- ユーザーごとのデータ分離を必須とする
- 他ユーザーの毛糸・作品データにはアクセスできないこと

---

## 8. Explicitly Out of Scope for Initial Release

- 他ユーザーへの公開機能
- 他ユーザーとの共有機能
- SNS機能
- コメント機能
- 作品の制作中管理
- 毛糸在庫の自動減算
- 通知機能
- 検索機能
- 絞り込み機能
- 削除機能
- パスワード再設定機能
- カメラ撮影による画像登録
- 複数画像登録

---

## 9. MVP Summary

初期リリースでは、以下を最重要価値として提供する。

1. ユーザーが毛糸を登録できる
2. 毛糸の残り玉数を手動更新できる
3. 毛糸の残数を視覚的に把握できる
4. 完成作品を登録できる
5. 作品に使用した毛糸を紐づけられる
6. 作品に参考URLを複数記録できる

このMVPでは、検索や共有などの拡張機能は持たず、まずは「個人が使いやすい毛糸・作品管理体験」を成立させることを優先する。

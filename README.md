# SCOPE | 仟教大学ポータル

Cloudflare Pages + Pages Functions を前提にした、仟教大学の学内ポータル風 ARG サイトです。  
公開フロントは Vite + React + TypeScript、サーバー側の照会判定は Pages Functions で実装しています。

## 採用構成

- フロントエンド: Vite + React + TypeScript
- ルーティング: React Router
- 配信: Cloudflare Pages
- サーバー処理: Cloudflare Pages Functions
- 方針: 公開講義は静的配信、特別講義の照会判定と詳細取得はサーバー側のみ

## ディレクトリ構成

```text
.
├─ functions/
│  ├─ _shared/
│  │  └─ catalogGateway.ts
│  └─ api/
│     └─ catalog/
│        ├─ query.ts
│        └─ entry/[token].ts
├─ public/
│  ├─ _redirects
│  └─ _routes.json
├─ src/
│  ├─ components/
│  ├─ data/
│  ├─ lib/
│  ├─ pages/
│  ├─ styles/
│  └─ types/
├─ .env.example
├─ index.html
├─ package.json
├─ vite.config.ts
└─ wrangler.toml
```

## セットアップ方法

1. Node.js 20 以降を用意します。
2. 依存関係をインストールします。

```bash
npm install
```

3. Pages Functions 用のローカル環境変数を用意します。

```bash
copy .env.example .dev.vars
```

4. `.dev.vars` の `COURSE_GATEWAY_JSON` を本番用の内容へ差し替えます。

## ローカル開発手順

### フロント画面だけ確認する場合

```bash
npm run dev
```

- `http://localhost:5173` で確認できます。
- この方法では Pages Functions は起動しないため、サーバー側照会は応答しません。

### Pages Functions を含めて確認する場合

```bash
npm run dev:pages
```

- `dist` をビルドしたあと、Wrangler 経由で Pages Functions を含めて確認できます。
- 画面を編集したあとは、再度 `npm run dev:pages` を実行してください。

## ビルドと確認

```bash
npm run check
npm run build
```

## Cloudflare Pages へのデプロイ手順

1. GitHub にこのリポジトリを push します。
2. Cloudflare Dashboard で Pages を新規作成し、GitHub リポジトリを接続します。
3. Build settings を以下にします。

- Framework preset: `None`
- Build command: `npm run build`
- Build output directory: `dist`

4. Environment Variables に `COURSE_GATEWAY_JSON` を登録します。
5. Deploy を実行します。

`wrangler.toml` には `pages_build_output_dir = "dist"` を設定済みです。

## GitHub 連携の想定

- GitHub 上では公開講義、文言、デザインを通常のコードレビューで管理します。
- 特別講義のキーワードと詳細データは `COURSE_GATEWAY_JSON` を使って Cloudflare 側で管理できます。
- リポジトリを公開運用する場合でも、クライアント配信物へ特別講義データを含めずに済みます。

## どのファイルを編集すれば何が変わるか

### 通常授業データ

- `src/data/publicCourses.ts`

### 秘密授業データ

- Cloudflare Pages の環境変数 `COURSE_GATEWAY_JSON`
- サーバー側の読み取りロジックは `functions/_shared/catalogGateway.ts`

### 秘密キーワード

- Cloudflare Pages の環境変数 `COURSE_GATEWAY_JSON`

### トップページ文言

- `src/data/portalContent.ts`

### 仮ページ文言

- `src/data/portalContent.ts`
- ログイン風 UI の構成は `src/components/LoginPanel.tsx`

### 色や見た目

- `src/styles/global.css`

## `COURSE_GATEWAY_JSON` の構造

この変数は JSON 配列です。  
1 つの照会語に対して複数講義をぶら下げられるので、将来の追加に対応できます。

```json
[
  {
    "matchText": "完全一致させたい文字列",
    "courses": [
      {
        "token": "Q7mL2aX9",
        "code": "SCP490",
        "title": "特別講義名",
        "instructor": "担当教員名",
        "faculty": "開講学部",
        "division": "開講区分",
        "yearLevel": "配当年次",
        "credits": "2単位",
        "schedule": "集中・学内指定",
        "summary": "授業概要",
        "objectives": ["到達目標1", "到達目標2"],
        "weeklyPlan": ["第1回 ...", "第2回 ..."],
        "assessment": "評価方法",
        "materials": "教科書・参考書",
        "requirements": "履修条件",
        "notes": "備考"
      }
    ]
  }
]
```

## 検索仕様

- 公開講義は `src/data/publicCourses.ts` をクライアント側で部分一致検索します。
- 特別講義の照会判定は `functions/api/catalog/query.ts` でサーバー側のみ実行します。
- サーバー側判定は `授業内容` フィールドだけを使います。
- 比較は `NFKC` 正規化 + `trim` 後の完全一致です。
- 一致した場合のみ、公開講義とは合算せず専用結果として表示します。
- 不一致時は常に通常の公開講義検索結果のみ表示します。
- 直接 URL を知っている利用者は `/syllabus/entry/<token>` にアクセスできます。

## 将来の拡張ポイント

- `functions/_shared/catalogGateway.ts`
  - 特別講義の複数件運用、Cloudflare KV への移行、検証ロジック差し替え
- `src/pages/SupportPage.tsx`
  - 学修支援システムの認証 API、ダッシュボード追加
- `src/pages/AcademicPage.tsx`
  - 教務システムの認証 API、申請・成績画面追加
- `src/pages/PublicWebsitePage.tsx`
  - 大学公式サイト風の別ページ群追加
- `src/styles/global.css`
  - テーマカラーやレイアウトの調整

## 無料枠前提の注意点

- 公開講義は静的配信のため、通常閲覧コストを抑えられます。
- サーバー側処理は検索時と詳細参照時のみ実行されるため、無料枠でも扱いやすい構成です。
- 特別講義データを増やしすぎる場合は、環境変数より KV や D1 への移行を検討してください。
- `_redirects` により SPA ルーティングを維持しつつ、`/api/*` は Pages Functions で処理します。

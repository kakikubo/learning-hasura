# 技術スタック

## コアフレームワーク & ランタイム
- **Next.js 15.3.4**: SSR/SSG機能を持つReactフレームワーク
- **React 19.0.0**: 最新機能を持つUIライブラリ
- **TypeScript 5.6.2**: 型安全なJavaScript開発
- **Node.js >=20.9.0**: ランタイム要件

## GraphQL & データ管理
- **Apollo Client 3.13.7**: キャッシュ機能付きGraphQLクライアント
- **Hasura**: GraphQLバックエンドサービス
- **GraphQL Code Generator**: スキーマからのTypeScript型自動生成

## スタイリング & UI
- **Tailwind CSS 4.1.4**: ユーティリティファーストCSSフレームワーク
- **Heroicons**: React用アイコンライブラリ
- **PostCSS**: CSS処理

## テスト
- **Jest 30.0.0**: jsdom環境でのテストフレームワーク
- **React Testing Library 16.2.0**: コンポーネントテストユーティリティ
- **MSW 2.0.0**: テスト用APIモック
- **@testing-library/jest-dom**: カスタムJestマッチャー

## パッケージ管理
- **pnpm 10.14.0**: 高速でディスク容量効率的なパッケージマネージャー
- **Node.js legacy OpenSSL**: 開発サーバーに必要

## よく使用するコマンド

### 開発
```bash
pnpm dev          # 開発サーバーを起動
pnpm build        # 本番用ビルド
pnpm start        # 本番サーバーを起動
pnpm lint         # ESLintを実行
```

### テスト
```bash
pnpm test         # jsdom環境でJestテストを実行
```

### コード生成
```bash
pnpm gen-types    # GraphQLスキーマからTypeScript型を生成
```

## 環境変数
`.env.local`に必要な設定:
- `NEXT_PUBLIC_HASURA_URL`: Hasura GraphQLエンドポイント
- `NEXT_PUBLIC_HASURA_KEY`: Hasura管理者シークレット

## ビルド設定
- **Babel**: Next.js用カスタムプリセット設定
- **ESLint**: Next.js推奨設定
- **Prettier**: シングルクォート、セミコロン有効
- **TypeScript**: 厳密モード無効、パスエイリアス設定済み
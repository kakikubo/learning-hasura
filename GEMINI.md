# プロジェクト概要

このプロジェクトは、Next.js、Hasura、Apollo Client を使用した Web アプリケーション開発の学習を目的としています。GomaGoma676 氏のチュートリアル「Next.js + Hasura」をベースにしており、開発環境のセットアップから基本的な CRUD 操作、テストの実装までを含みます。

## 主要技術スタック

- **フロントエンド**: [Next.js](https://nextjs.org/) (React フレームワーク)
- **バックエンド**: [Hasura](https://hasura.io/) (GraphQL API as a Service)
- **API 通信**: [Apollo Client](https://www.apollographql.com/docs/react/)
- **言語**: [TypeScript](https://www.typescriptlang.org/)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)
- **テスト**: [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), [MSW (Mock Service Worker)](https://mswjs.io/)
- **コード生成**: [GraphQL Code Generator](https://www.graphql-code-generator.com/)
- **パッケージ管理**: [pnpm](https://pnpm.io/)

## プロジェクト構成

- `pages/`: Next.js のページコンポーネントが配置されています。
  - `hasura-crud.tsx`: Hasura を利用した CRUD 操作のサンプルページです。
  - `hasura-main.tsx`: Hasura と連携したメインページです。
  - `hasura-ssg.tsx`: Hasura を利用した静的サイト生成 (SSG) のサンプルページです。
- `components/`: 再利用可能な React コンポーネントが配置されています。
- `queries/`: GraphQL のクエリ定義が配置されています。
- `lib/`: Apollo Client の設定など、ライブラリ関連のコードが配置されています。
- `__tests__/`: Jest と React Testing Library を用いたテストコードが配置されています。
- `mock/`: MSW を利用した API モックが定義されています。

## 開発コマンド

- `pnpm dev`: 開発サーバーを起動します。
- `pnpm build`: プロダクション用にビルドします。
- `pnpm start`: ビルドされたアプリケーションを起動します。
- `pnpm test`: Jest を使用してテストを実行します。
- `pnpm gen-types`: GraphQL のスキーマから TypeScript の型定義を生成します。
- `pnpm lint`: ESLint を使用してコードの静的解析を実行します。

# プロジェクト構造

## ルートディレクトリ構成

```
├── components/          # 再利用可能なReactコンポーネント
├── hooks/              # カスタムReactフック
├── lib/                # ユーティリティライブラリと設定
├── pages/              # Next.jsページ（ファイルベースルーティング）
├── public/             # 静的アセット
├── queries/            # GraphQLクエリ、ミューテーション、サブスクリプション
├── styles/             # グローバルCSSとスタイリング
├── types/              # TypeScript型定義
├── __tests__/          # テストファイル
└── mock/               # テスト用モックデータとハンドラー
```

## 主要ディレクトリ

### `/components`

- 関数コンポーネントパターンに従った再利用可能な UI コンポーネント
- プロパティには TypeScript インターフェースを使用
- テスト用に`data-testid`属性を含める
- 命名規則: コンポーネントファイルは PascalCase

### `/pages`

- Next.js ファイルベースルーティング
- 各ファイルはデフォルト React コンポーネントをエクスポート
- データ取得には`getStaticProps`/`getServerSideProps`を使用
- 動的ルートには`/users/[id].tsx`のようなサブフォルダー

### `/lib`

- `apolloClient.ts`: SSR サポート付き Apollo Client 設定
- ユーティリティ関数と共有設定
- 環境固有のロジック

### `/queries`

- `queries.ts`内のすべての GraphQL 操作
- `gql`テンプレートリテラルを使用
- 命名規則: 操作は大文字
- クエリ、ミューテーション、サブスクリプションを分離

### `/types/generated`

- GraphQL スキーマから自動生成された TypeScript 型
- GraphQL Code Generator によって生成
- 手動編集禁止 - `pnpm gen-types`で再生成

### `/hooks`

- ビジネスロジック用カスタム React フック
- フック名には`use`プレフィックスを使用
- フォーム処理、API 呼び出し、状態管理をカプセル化

## ファイル命名規則

- **コンポーネント**: PascalCase（例: `CreateUser.tsx`）
- **ページ**: kebab-case（例: `hasura-crud.tsx`）
- **フック**: `use`プレフィックス付き camelCase（例: `useCreateForm.ts`）
- **型**: インターフェース/型は PascalCase
- **定数**: GraphQL 操作は大文字

## インポートパターン

- パスエイリアスを使用: `@/components/*`は`components/*`にマップ
- ローカルファイルには相対インポート
- インポートをグループ化: 外部ライブラリ、内部モジュール、相対インポート
- コンポーネントには名前付きエクスポートを使用（ページ以外はデフォルトエクスポート不使用）

## テスト構造

- `__tests__/`ディレクトリ内のテストファイル
- コンポーネント構造をミラー
- `.test.tsx`サフィックスを使用
- 信頼性の高いテストのためにコンポーネントに`data-testid`属性を含める
- `/mock`ディレクトリ内の外部依存関係をモック

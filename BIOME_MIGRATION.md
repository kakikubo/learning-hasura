# Biome移行ガイド

このドキュメントは、ESLintとPrettierからBiomeへの移行プロセスと、新しいツールチェーンの使用方法を説明します。

## 目次

1. [移行の概要](#移行の概要)
2. [移行手順](#移行手順)
3. [Biomeの使用方法](#biomeの使用方法)
4. [主要な変更点](#主要な変更点)
5. [トラブルシューティング](#トラブルシューティング)

## 移行の概要

### なぜBiomeに移行するのか？

- **パフォーマンス向上**: Rust実装により、ESLint+Prettierと比較して大幅に高速化
- **統合ツールチェーン**: リンティングとフォーマッティングを単一ツールで実行
- **設定の簡素化**: 複数の設定ファイルが`biome.json`1つに集約
- **依存関係の削減**: 多数のESLintプラグインが不要に

### パフォーマンス比較

実測値（このプロジェクトでの計測結果）:

| ツール | 実行時間 | 改善率 |
|--------|----------|--------|
| ESLint | 2.89秒 | - |
| Biome | 0.04秒 | **98.6%高速化** |

詳細は[performance-comparison.md](.kiro/specs/biome-migration/performance-comparison.md)を参照してください。

## 移行手順

### 完了した移行ステップ

以下の手順はすでに完了しています：

#### 1. Biomeのインストール

```bash
pnpm add -D @biomejs/biome
```

#### 2. Biome設定ファイルの作成

`biome.json`を作成し、以下の設定を適用：

- フォーマッター設定（Prettier互換）
- リンター設定（ESLint互換）
- ファイル除外パターン

#### 3. package.jsonスクリプトの更新

```json
{
  "scripts": {
    "lint": "biome check --write .",
    "lint:check": "biome check .",
    "format": "biome format --write .",
    "format:check": "biome format ."
  }
}
```

#### 4. Lefthook（Git hooks）の更新

`lefthook.yml`を更新し、pre-commitフックでBiomeを実行するように設定。

#### 5. GitHub Actionsの更新

`.github/workflows/lint.yml`を更新し、CIパイプラインでBiomeを使用。

#### 6. ESLint依存関係の削除

以下のパッケージを削除：
- `eslint`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `eslint-config-next`
- `@eslint/eslintrc`
- `@eslint/js`

`eslint.config.js`も削除。

#### 7. Prettierの削除

Prettierの依存関係と設定ファイルは完全に削除されました。
- フォーマッター: Biome（統一）

## Biomeの使用方法

### 基本コマンド

#### リンティング

```bash
# リンティングチェックのみ（修正なし）
pnpm lint:check

# リンティングチェックと自動修正
pnpm lint
```

#### フォーマッティング

```bash
# Biomeでフォーマット
pnpm format

# Biomeでフォーマットチェックのみ
pnpm format:check
```

### VSCode統合

#### 推奨拡張機能

`.vscode/extensions.json`に以下が設定されています：

```json
{
  "recommendations": [
    "biomejs.biome"
  ]
}
```

#### 保存時の自動フォーマット

VSCodeの設定で保存時にBiomeを実行するように設定できます：

```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  }
}
```

### Git Hooks

コミット前に自動的にBiomeチェックが実行されます：

```bash
git add .
git commit -m "your message"
# → lefthookがBiomeリンティングとフォーマットを自動実行
```

リンティングエラーがある場合、コミットは拒否されます。

### CI/CD

GitHub Actionsで自動的にBiomeチェックが実行されます：

- プルリクエスト作成時
- mainブランチへのプッシュ時

## 主要な変更点

### ESLintからBiomeへ

#### コマンドの変更

| 以前（ESLint） | 現在（Biome） |
|---------------|--------------|
| `eslint .` | `biome check .` |
| `eslint . --fix` | `biome check --write .` |

#### 設定ファイルの変更

| 以前 | 現在 |
|------|------|
| `eslint.config.js` | `biome.json` |
| 複数のESLintプラグイン設定 | 単一の統合設定 |

#### リンティングルールの対応

主要なESLintルールはBiomeで同等のルールに対応：

| ESLintルール | Biomeルール |
|-------------|------------|
| `no-console` | `nursery/noConsole` |
| `no-debugger` | `suspicious/noDebugger` |
| `@typescript-eslint/no-unused-vars` | `correctness/noUnusedVariables` |
| `react-hooks/rules-of-hooks` | `correctness/useHookAtTopLevel` |
| `react-hooks/exhaustive-deps` | `correctness/useExhaustiveDependencies` |

### フォーマッター設定

このプロジェクトではBiomeを唯一のフォーマッターとして使用しています：

```bash
pnpm format
```

Biomeのフォーマット設定：
- シングルクォート
- セミコロン有効
- タブ幅: 2スペース
- 行幅: 80文字

### 除外パターン

以下のディレクトリは自動的に除外されます：

- `node_modules/`
- `.next/`
- `types/generated/`
- `dist/`
- `build/`

## トラブルシューティング

### 問題1: Biomeコマンドが見つからない

**症状**: `biome: command not found`

**解決方法**:
```bash
# 依存関係を再インストール
pnpm install

# Biomeが正しくインストールされているか確認
pnpm list @biomejs/biome
```

### 問題2: VSCode拡張機能が動作しない

**症状**: VSCodeでBiomeの自動フォーマットが動作しない

**解決方法**:
1. Biome拡張機能がインストールされているか確認
2. VSCodeを再起動
3. 設定で`biomejs.biome`がデフォルトフォーマッターに設定されているか確認

```json
{
  "editor.defaultFormatter": "biomejs.biome"
}
```

### 問題3: Git hooksが実行されない

**症状**: コミット時にBiomeチェックが実行されない

**解決方法**:
```bash
# lefthookを再インストール
pnpm lefthook install

# lefthook設定を確認
cat lefthook.yml
```

### 問題4: CIでBiomeチェックが失敗する

**症状**: GitHub ActionsでBiomeチェックが失敗するが、ローカルでは成功する

**解決方法**:
1. ローカルで同じコマンドを実行して確認
```bash
pnpm lint:check
```

2. すべての変更がコミットされているか確認
3. `node_modules`のキャッシュをクリア（GitHub Actions設定で）

### 問題5: フォーマット結果の一貫性

**症状**: 以前のPrettierとBiomeでフォーマット結果が微妙に異なる

**解決方法**:

これは正常な動作です。BiomeとPrettierは完全に同一ではありません。

- このプロジェクトではBiomeに完全移行済み
- すべてのファイルはBiomeでフォーマットされています
- チーム全体でBiomeを使用することで一貫性を保っています

### 問題6: 特定のファイルでリンティングエラーが多発

**症状**: 移行後に特定のファイルで多数のエラーが報告される

**解決方法**:

1. エラーを確認し、正当なものか判断
```bash
pnpm lint:check
```

2. 自動修正を試行
```bash
pnpm lint
```

3. 特定のルールを無効化する必要がある場合、`biome.json`を編集
```json
{
  "linter": {
    "rules": {
      "suspicious": {
        "noExplicitAny": "off"
      }
    }
  }
}
```

4. ファイル単位で無効化する場合、コメントを使用
```typescript
// biome-ignore lint/suspicious/noExplicitAny: 理由を記載
const data: any = {};
```

### 問題7: パフォーマンスが期待より遅い

**症状**: Biomeの実行が予想より遅い

**解決方法**:

1. 除外パターンが正しく設定されているか確認
2. 大きなファイルや生成されたファイルが含まれていないか確認
3. `biome.json`の`files.ignore`セクションを確認

```json
{
  "files": {
    "ignore": [
      "node_modules",
      ".next",
      "types/generated",
      "dist",
      "build"
    ]
  }
}
```

### 問題8: 既存のテストが失敗する

**症状**: Biome移行後にJestテストが失敗する

**解決方法**:

Biome自体はテストに影響を与えません。以下を確認：

1. すべてのテストを実行
```bash
pnpm test
```

2. テストファイルがフォーマットされているか確認
3. インポート文が正しく整理されているか確認

## サポートとリソース

### 公式ドキュメント

- [Biome公式サイト](https://biomejs.dev/)
- [Biome設定リファレンス](https://biomejs.dev/reference/configuration/)
- [Biomeリンティングルール](https://biomejs.dev/linter/rules/)

### プロジェクト固有のドキュメント

- [要件定義](.kiro/specs/biome-migration/requirements.md)
- [設計ドキュメント](.kiro/specs/biome-migration/design.md)
- [実装タスク](.kiro/specs/biome-migration/tasks.md)
- [パフォーマンス比較](.kiro/specs/biome-migration/performance-comparison.md)

### チーム内サポート

質問や問題がある場合は、プロジェクトのIssueトラッカーで報告してください。

## まとめ

Biomeへの移行により、以下のメリットが得られました：

✅ **98.6%の高速化**: リンティング実行時間が2.89秒から0.04秒に短縮
✅ **統合ツールチェーン**: リンティングとフォーマッティングを単一ツールで実行
✅ **設定の簡素化**: 複数の設定ファイルが`biome.json`1つに集約
✅ **依存関係の削減**: ESLint関連パッケージを削除し、プロジェクトを軽量化

移行は完了しており、すべての開発ワークフロー（ローカル開発、Git hooks、CI/CD）でBiomeが正常に動作しています。

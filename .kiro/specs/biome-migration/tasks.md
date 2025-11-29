# Implementation Plan

- [x] 1. Biomeのインストールと基本設定
  - Biomeパッケージを開発依存関係としてインストール
  - 基本的な`biome.json`設定ファイルを作成
  - VSCode拡張機能の推奨設定を追加
  - _Requirements: 1.1, 1.2_

- [x] 2. Biome設定の詳細定義
  - フォーマッター機能を無効化（既存のコードスタイルを維持）
  - リンター設定を現在のESLintルールに合わせて設定
  - 既存コードとの互換性のため、厳格なルールを無効化
  - JavaScript/TypeScript固有の設定を追加
  - ファイル除外パターンを設定
  - _Requirements: 1.3, 2.1, 2.2, 2.3, 2.4, 3.3_

- [x] 3. Biomeリンティング設定の調整
  - フォーマッターを無効化し、リンティングのみを有効化
  - 既存コードを変更しないようルールを調整
  - noUnusedVariables, noUnusedImports, useImportTypeなどを無効化
  - アクセシビリティルール（a11y）を無効化
  - console.logを許可リストに追加
  - _Requirements: 3.1, 3.2_

- [x] 3.1 リンティング設定の検証
  - Biomeチェックを実行し、既存コードでエラーが出ないことを確認
  - 必要に応じてルールを調整
  - _Requirements: 2.1_

- [x] 4. Biomeでリンティングチェックを実行
  - すべてのファイルに対してBiomeリンティングを実行
  - 報告されたエラーと警告を確認
  - 必要に応じてコードを修正またはルールを調整
  - _Requirements: 3.4_

- [x] 4.1 リンティングルールの検証
  - 既知のエラーを含むファイルでBiomeとESLintの検出結果を比較
  - 重要なルールが維持されていることを確認
  - _Requirements: 2.2, 2.3, 2.4_

- [x] 4.2 ESLintとBiomeの実行速度比較
  - ESLintでリンティングを実行し、実行時間を計測
  - Biomeでリンティングを実行し、実行時間を計測
  - 両者の実行時間を比較し、パフォーマンス改善を確認
  - 結果をドキュメントに記録
  - _Requirements: 2.2, 2.3, 2.4_

- [x] 5. package.jsonスクリプトの更新
  - `lint`、`lint:check`スクリプトをBiomeコマンドに更新
  - デフォルトの`format`、`format:check`スクリプトをBiomeコマンドに変更
  - Prettierフォーマットコマンド（`format:prettier`、`format:prettier:check`）を代替オプションとして追加
  - 新しいスクリプトが正常に動作することを確認
  - _Requirements: 1.4, 4.4_

- [x] 6. Lefthook設定の更新
  - `lefthook.yml`を確認し、現在のpre-commit hooksを特定
  - ESLintコマンドをBiomeリンティングコマンドに置き換え
  - Biomeフォーマットコマンドを追加（デフォルトのフォーマッター）
  - Prettierコマンドも代替オプションとして利用可能に維持
  - `lefthook install`を実行してhooksを再インストール
  - _Requirements: 5.1, 5.2, 5.3_

- [x] 6.1 Git hooksのテスト
  - 意図的にリンティングエラーを含むコードでコミットを試行
  - lefthookがBiomeリンティングとフォーマットを実行し、エラーがある場合コミットが拒否されることを確認
  - _Requirements: 5.4_

- [-] 7. GitHub Actions設定の更新
  - `.github/workflows`ディレクトリ内のワークフローファイルを確認
  - ESLintステップをBiomeリンティングステップに置き換え
  - Prettierステップはそのまま維持（フォーマットチェック用）
  - 必要に応じてBiomeのインストールステップを追加
  - _Requirements: 6.1, 6.2, 6.3_

- [-] 7.1 CI/CDパイプラインのテスト
  - プルリクエストを作成してGitHub Actionsをトリガー
  - Biomeリンティングチェックが正常に実行されることを確認
  - 意図的にリンティングエラーを含むコードでCIが失敗することを確認
  - _Requirements: 6.4_

- [ ] 8. 移行の検証
  - `pnpm lint:check`を実行し、すべてのファイルがエラーなしでチェックされることを確認
  - `pnpm test`を実行し、すべてのテストが合格することを確認
  - `pnpm dev`を実行し、開発サーバーが正常に起動することを確認
  - `pnpm build`を実行し、本番用ビルドが成功することを確認
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 9. ESLintの依存関係を削除
  - ESLint関連パッケージをアンインストール
  - `eslint.config.js`を削除
  - ESLint関連のpackage.jsonスクリプト（`lint:eslint`、`lint:eslint:check`）を削除
  - _Requirements: 4.1, 4.2_

- [ ] 10. Prettierの依存関係を削除（オプション）
  - Prettierパッケージをアンインストール
  - `.prettierrc`を削除
  - Prettier関連のpackage.jsonスクリプト（`format:prettier`、`format:prettier:check`）を削除
  - デフォルトの`format`スクリプトをBiomeに変更
  - 注: この手順は、Biomeのフォーマッターを完全に採用する場合のみ実行
  - _Requirements: 4.3_

- [ ] 11. ドキュメントの作成
  - 移行手順を記録したドキュメントを作成
  - Biomeの使用方法（新しいリンティングコマンド）を説明
  - ESLintからBiomeへの主要な変更点を記載
  - BiomeとPrettierの両方のフォーマットコマンドが利用可能であることを明記
  - トラブルシューティングガイドを追加
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 12. 最終チェックポイント
  - すべてのテストが合格していることを確認
  - 開発環境とCI/CD環境の両方でBiomeが正常に動作することを確認
  - チームメンバーに移行完了を通知
  - 問題が発生した場合はユーザーに質問

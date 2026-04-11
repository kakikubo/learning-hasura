/**
 * ESM .mjs ファイル用のカスタム Jest トランスフォーマー。
 * ESM の import/export を CommonJS の require/module.exports に変換し、
 * --experimental-vm-modules なしで Jest が処理できるようにする。
 */

export default {
  process(sourceText) {
    let code = sourceText;

    // 変換: import { X, Y } from "module"
    code = code.replace(
      /import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]\s*;?/g,
      (_, imports, mod) => {
        const names = imports.split(',').map((n) => n.trim());
        const hasRename = names.some((n) => n.includes(' as '));
        if (hasRename) {
          const destructured = names
            .map((n) => {
              const parts = n.split(/\s+as\s+/);
              return parts.length === 2
                ? `${parts[0].trim()}: ${parts[1].trim()}`
                : parts[0].trim();
            })
            .join(', ');
          return `const { ${destructured} } = require("${mod}");`;
        }
        return `const { ${imports.trim()} } = require("${mod}");`;
      }
    );

    // 変換: import X from "module"
    code = code.replace(
      /import\s+(\w+)\s+from\s+['"]([^'"]+)['"]\s*;?/g,
      'const $1 = require("$2");'
    );

    // 変換: import "module"
    code = code.replace(/import\s+['"]([^'"]+)['"]\s*;?/g, 'require("$1");');

    // 変換: export { X, Y }
    code = code.replace(/export\s+\{([^}]+)\}\s*;?/g, (_, exports) => {
      return exports
        .split(',')
        .map((e) => {
          const parts = e.trim().split(/\s+as\s+/);
          const local = parts[0].trim();
          const exported = parts.length === 2 ? parts[1].trim() : local;
          return `Object.defineProperty(exports, "${exported}", { enumerable: true, get: function() { return ${local}; } });`;
        })
        .join('\n');
    });

    // 変換: export const/let/var/function/class
    code = code.replace(/export\s+(const|let|var|function|class)\s+/g, '$1 ');

    return { code };
  },
};

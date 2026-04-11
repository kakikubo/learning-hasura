/**
 * Custom Jest transformer for ESM .mjs files.
 * Converts ESM import/export to CommonJS require/module.exports
 * so Jest can process them without --experimental-vm-modules.
 */
'use strict';

module.exports = {
  process(sourceText, sourcePath) {
    // Convert import statements to require
    let code = sourceText;

    // Convert: import { X, Y } from "module"
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
      },
    );

    // Convert: import X from "module"
    code = code.replace(
      /import\s+(\w+)\s+from\s+['"]([^'"]+)['"]\s*;?/g,
      'const $1 = require("$2");',
    );

    // Convert: import "module"
    code = code.replace(
      /import\s+['"]([^'"]+)['"]\s*;?/g,
      'require("$1");',
    );

    // Convert: export { X, Y }
    code = code.replace(
      /export\s+\{([^}]+)\}\s*;?/g,
      (_, exports) => {
        return exports
          .split(',')
          .map((e) => {
            const parts = e.trim().split(/\s+as\s+/);
            const local = parts[0].trim();
            const exported = parts.length === 2 ? parts[1].trim() : local;
            return `Object.defineProperty(exports, "${exported}", { enumerable: true, get: function() { return ${local}; } });`;
          })
          .join('\n');
      },
    );

    // Convert: export const/let/var/function/class
    code = code.replace(
      /export\s+(const|let|var|function|class)\s+/g,
      '$1 ',
    );

    return { code };
  },
};

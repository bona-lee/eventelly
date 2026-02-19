/**
 * @fileoverview Enforces COLOR CONTRACT v1.0
 *
 * Disallows raw Tailwind color utilities outside approved decorative contexts.
 *
 * Allowed groups:
 *   - brand-primary-*
 *   - admin-primary-*
 *   - neutral-*
 *   - status-*
 *   - destructive-*
 *   - form-required
 *
 * Any additional color group requires a contract version upgrade.
 *
 * Exceptions (configurable):
 *   - Files matching `allowedFiles` patterns (e.g. style-guide)
 *   - String literals inside array expressions (avatar palettes, gradients)
 *   - Object property values for keys in `allowedProperties` (badge configs)
 */

'use strict'

// Matches utility-color-shade patterns for ALL default Tailwind color families.
// Does NOT match: neutral-* (project token), black, white (structural).
const RAW_COLOR_RE = /\b(?:bg|text|border|ring|from|to|via|outline|shadow|divide|placeholder|decoration|accent|caret|fill|stroke)-(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|stone)-(?:50|100|200|300|400|500|600|700|800|900|950)\b/

const DEFAULT_ALLOWED_PROPERTIES = ['color', 'gradient', 'iconBg', 'iconColor']

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Forbid raw Tailwind color utilities — use design tokens instead.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowedFiles: {
            type: 'array',
            items: { type: 'string' },
            description: 'File-path substrings that are fully exempt (e.g. "style-guide/page.tsx").',
          },
          allowedProperties: {
            type: 'array',
            items: { type: 'string' },
            description: 'Object property names whose values are exempt (e.g. "color", "gradient").',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      forbidden:
        'Raw Tailwind color "{{color}}" detected. Use a design token (admin-primary-*, status-*, destructive-*, etc.).',
    },
  },

  create(context) {
    const options = context.options[0] || {}
    const allowedFiles = options.allowedFiles || []
    const allowedProperties = options.allowedProperties || DEFAULT_ALLOWED_PROPERTIES

    // Skip entire file if it matches a whitelist entry.
    const filename = context.getFilename()
    if (allowedFiles.some((pattern) => filename.replace(/\\/g, '/').includes(pattern))) {
      return {}
    }

    /**
     * Return true when the node sits in a context we consider "decorative config"
     * and therefore exempt from the rule.
     */
    function isExempt(node) {
      const parent = node.parent

      // 1. Inside an array literal  →  avatar / gradient palette
      if (parent.type === 'ArrayExpression') return true

      // 2. Value of a whitelisted object property
      if (
        parent.type === 'Property' &&
        !parent.computed &&
        allowedProperties.includes(parent.key.name || parent.key.value)
      ) {
        return true
      }

      return false
    }

    return {
      // Plain string literals: className="bg-red-500", ternary branches, etc.
      Literal(node) {
        if (typeof node.value !== 'string') return
        const match = node.value.match(RAW_COLOR_RE)
        if (!match) return
        if (isExempt(node)) return

        context.report({
          node,
          messageId: 'forbidden',
          data: { color: match[0] },
        })
      },

      // Template literals: className={`bg-${dynamic} text-red-500`}
      TemplateLiteral(node) {
        for (const quasi of node.quasis) {
          const match = quasi.value.raw.match(RAW_COLOR_RE)
          if (!match) continue
          if (isExempt(node)) continue

          context.report({
            node,
            messageId: 'forbidden',
            data: { color: match[0] },
          })
        }
      },
    }
  },
}

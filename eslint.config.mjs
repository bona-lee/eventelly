import nextConfig from 'eslint-config-next'
import noRawTailwindColors from './eslint-rules/no-raw-tailwind-colors.js'

export default [
  ...nextConfig,
  {
    plugins: {
      custom: {
        rules: {
          'no-raw-tailwind-colors': noRawTailwindColors,
        },
      },
    },
    rules: {
      'custom/no-raw-tailwind-colors': [
        'error',
        {
          allowedFiles: [
            'style-guide/page.tsx',
            'auth/login/page.tsx',
          ],
          allowedProperties: ['color', 'gradient', 'iconBg', 'iconColor'],
        },
      ],
      'react-hooks/static-components': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-compiler/react-compiler': 'warn',
    },
  },
]

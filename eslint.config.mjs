import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: ['type:ui', 'type:hooks', 'type:i18n', 'type:stores', 'type:context', 'type:api', 'type:types', 'type:utils'],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:hooks', 'type:stores', 'type:context', 'type:types', 'type:utils', 'type:i18n'],
            },
            {
              sourceTag: 'type:hooks',
              onlyDependOnLibsWithTags: ['type:api', 'type:stores', 'type:types', 'type:utils'],
            },
            {
              sourceTag: 'type:i18n',
              onlyDependOnLibsWithTags: ['type:stores', 'type:types', 'type:utils'],
            },
            {
              sourceTag: 'type:stores',
              onlyDependOnLibsWithTags: ['type:types', 'type:utils'],
            },
            {
              sourceTag: 'type:context',
              onlyDependOnLibsWithTags: ['type:stores', 'type:hooks', 'type:types', 'type:utils'],
            },
            {
              sourceTag: 'type:api',
              onlyDependOnLibsWithTags: ['type:types', 'type:utils'],
            },
            {
              sourceTag: 'type:utils',
              onlyDependOnLibsWithTags: ['type:types'],
            },
            {
              sourceTag: 'type:types',
              onlyDependOnLibsWithTags: [],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];

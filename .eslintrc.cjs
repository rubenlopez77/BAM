// ESLint configuration for BAM + Playwright + TypeScript
module.exports = {
  root: true,

  env: {
    es2022: true,
    node: true,
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },

  plugins: ['@typescript-eslint', 'bam'],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],

  rules: {
    /* --- BAM Plugin--- */
    'bam/bam-required-metadata': ['error', {
      require: ['ID', 'Title', 'Description'],
      testFunctions: ['test', 'it'],
      lookbackComments: 6
    }],


    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off', // deja fluir el tipado inferido
    '@typescript-eslint/no-explicit-any': 'warn',


    'no-restricted-syntax': [
      'error',
      {
        selector: "MemberExpression[property.name='waitForTimeout']",
        message: 'Evita page.waitForTimeout(). Usa esperas condicionales (page.waitForSelector() o expect()).'
      }
    ],
    'no-restricted-properties': [
      'error',
      {
        object: 'page',
        property: 'locator',
        message: 'Usa getByRole() o getByTestId() en lugar de locator() para mayor estabilidad.'
      },
      {
        object: 'page',
        property: '$',
        message: 'Evita selectores CSS directos. Prefiere getByRole() o getByTestId().'
      }
    ],

    /* --- Estilo y legibilidad --- */
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'no-console': 'off', // permitido en entorno de pruebas
  },

  overrides: [
    {
      files: ['**/*.test.ts', '**/*.spec.ts'],
      rules: {
        'bam/bam-required-metadata': 'error'
      }
    }
  ]
};

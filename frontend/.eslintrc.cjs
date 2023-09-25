module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
  'ignorePatterns': [
    '.eslintrc.js',
    'vite.config.ts',
    'codegen.ts',
  ],
  'parserOptions': {
    'ecmaVersion': 13,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
    },
    'project': './tsconfig.json',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
  'rules': {
    'react/react-in-jsx-scope': 'off',
    "@typescript-eslint/no-unused-vars": "warn",
  },
}

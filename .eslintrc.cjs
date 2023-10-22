module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:jsdoc/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['*.html'],
      parser: '@html-eslint/parser',
      extends: ['plugin:@html-eslint/recommended'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: [
    'react',
    '@html-eslint',
    'jsdoc'
  ],
  rules: {
    'id-match': ['error', '^[a-z]+([A-Z][a-z]+)*$'],
    '@html-eslint/id-naming-convention': ['error', 'kebab-case'],
    'new-cap': 'off'
  }
}

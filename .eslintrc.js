module.exports = {
  root: true,

  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:no-template-curly-in-string-fix/recommended',
  ],

  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'no-console': 'off',
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/require-default-prop': 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false,
        ignores: [],
      },
    ],
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'vue/v-on-event-hyphenation': [
      'error',
      'always',
      {
        autofix: false,
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/html-comment-content-spacing': ['error', 'always'],
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/new-line-between-multi-line-property': [
      'error',
      {
        minLineOfMultilineProperty: 2,
      },
    ],
    'vue/no-useless-v-bind': [
      'error',
      {
        ignoreIncludesComment: true,
        ignoreStringEscape: true,
      },
    ],
    'vue/v-for-delimiter-style': ['error', 'in'],
    'vue/no-empty-component-block': ['error'],
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        trailingComma: 'es5',
        plugins: ['prettier-plugin-tailwindcss'],
      },
    ],
  },
}

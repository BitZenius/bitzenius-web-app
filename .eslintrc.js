module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-lonely-if': 'off',
    'no-trailing-spaces': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/valid-v-slot': 'off',
    'vue/html-self-closing': 'off',
    'vue/no-mutating-props': 'off',
    'indent':'off'
  }
}

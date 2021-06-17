module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'eol-last': 0,//这句话表示在文件末尾可以不加回车，贴个链接  https://eslint.org/docs/rules/eol-last
    'space-before-function-paren': 0 //这句话表示在函数后可以不加空格
  }
}

module.exports = {
  eslintIntegration: true, // 让prettier使用eslint代码格式进行代码校验
  stylelintIntegration: true,
  tabWidth: 2, //一个tab代表几个空格数
  singleQuote: true, // 使用单引号代替双引号
  semi: false, // 去掉代码结尾的分号
  printWidth: 120, //一行的字符数，如果超过会进行换行，默认为80

  useTabs: false, //是否使用tab进行缩进，默认为false，表示用空格进行缩减
  trailingComma: 'none', //是否使用尾逗号，有三个可选值"<none|es5|all>"
  bracketSpacing: true //对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
}

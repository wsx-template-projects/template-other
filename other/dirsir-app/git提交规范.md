#### git 提交代码规范

```bash

git add .

git commit -m 'type: subject'

```

- Commit message 格式 type: subject

```bash
  # type 用于说明 commit 的类别，只允许使用下面7个标识。

  'feat', // 新特性
  'fix', // 修改问题，修复bug
  'docs', // 文档修改
  'style', // 代码格式修改，注意不是css修改，不影响代码运行的变动
  'refactor', // 代码重构
  'test', // 测试用例修改
  'chore', // 其它修改，比如构建流程、或者增加依赖库、工具等
  'merge' // 合并分支

  # 冒号后面接一个空格，注意冒号为英文输入法下面的冒号

  # subject 是commit目的的简短描述，不超过50个字符，且结尾不加句号

```

#### 使用工具校验 commit 是否符合规范 (提交规范制定 + git hook)

- commitlint 安装与提交规范的制定

```bash

  # 相关工具模块

  局部安装：npm i @commitlint/cli @commitlint/config-conventional -D

  全局安装：npm i @commitlint/cli @commitlint/config-conventional -g

  # 创建 commitlint.config.js文件，并制定提交message规范

  module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'type-enum': [
        2, // 标识必须输入
        'always',
        [
          'feat', // 新特性
          'fix', // 修改问题，修复bug
          'docs', // 文档修改
          'style', // 代码格式修改，注意不是css修改，不影响代码运行的变动
          'refactor', // 代码重构
          'test', // 测试用例修改
          'chore', // 其它修改，比如构建流程、或者增加依赖库、工具等
          'merge' // 合并分支
        ]
      ],
      'subject-full-stop': [0, 'never'],
      'subject-case': [0, 'never']
    }
  }

```

- git hooks

```bash

  # 相关模块

  npm i husky lint-staged -D

  # 安装成功后需要在项目下的package.json中添加一些配置

  "config": {
    "commitizen": {
      "path": "cz-customizable"
    }
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "src/**/*.{js,vue}": [
      "eslint --fix",
      "git add"
    ]
  },

```

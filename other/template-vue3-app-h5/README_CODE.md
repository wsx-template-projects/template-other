# vue3-app

vue3.0 移动端项目案例

#### 技术栈

vue3.0 + vue-router4.0 + vant3.0 + webpack4.0 + axios

#### 代码规范

- 代码规范的目的是提高项目的可维护性。
- 请阅读以上目录结构，了解每个文件和文件夹的作用，按照项目结构风格来编程。
- 项目已配置 eslint + prettier，需要自行配置好编辑器才能生效。

#### vscode 相关配置

- eslint：
  1、安装 eslint 插件。
  2、打开 vscode 设置的 settings.json，添加以下配置：

  ```bash

    "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue-html",
    "vue"
    ],
    "eslint.options": {
    "plugins": ["html"]
    },

  ```

- prettier：
  1、安装 prettier 插件。
  2、打开 vscode 设置的 settings.json，添加以下配置：

  ```bash

    "[html]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[css]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[less]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[scss]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[vue]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "vetur.format.defaultFormatter.html": "js-beautify-html",
      "vetur.format.defaultFormatterOptions": {
      "prettier": {
      "eslintIntegration": true,
      "singleQuote": true,
      "semi": true
    }
  },

  ```

- 还需要安装个插件：EditorConfig for VS Code
  用来自动识别项目的.editorconfig 文件配置，保持编辑器编码风格的统一。

  根路径下添加.editorconfig 文件，添加如下配置

  ```bash

  # https://editorconfig.org
    root = true

    [*]
    charset = utf-8
    indent_style = space
    indent_size = 2
    end_of_line = crlf
    insert_final_newline = true
    trim_trailing_whitespace = true

    [*.md]
    insert_final_newline = false
    trim_trailing_whitespace = false

  ```

#### 第三方插件

动态设置标题插件 vue-wechat-title

#### 注意事项

cnpm i 安装插件有时候容易出错；最好使用 npm i 来安装依赖

#### 目录文件说明

- 项目文件树

```bash

├─public
└─src
│ ├─api
│ ├─assets
│ │ └─images
│ │ ├─com
│ │ ├─demo
│ │ ├─home
│ │ ├─my
│ │ └─order
│ ├─components
│ │ ├─btn
│ │ ├─calculator
│ │ ├─footerNav
│ │ ├─headerBar
│ │ └─toast
│ ├─context
│ │ ├─classify
│ │ └─home
│ ├─hooks
│ ├─plugins
│ │ ├─loading
│ │ └─toast
│ ├─router
│ │ └─modules
│ ├─store
│ │ └─modules
│ ├─styles
│ ├─utils
│ └─views
│ ├─classify
│ │ └─components
│ ├─demo
│ │ └─provide
│ │ └─components
│ ├─goodsDetails
│ ├─index
│ │ └─components
│ ├─layout
│ └─my

```

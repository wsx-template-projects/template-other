### webpack 相关

```bash

  # require.context 前端模块自动化
  ==》实现自动化导入模块
  ==》实现场景：遇到从一个文件夹引入很多模块的情况,可以使用这个api,它会遍历文件夹中的指定文件,然后自动导入,使得不需要每次显式的调用import导入模块

  # require.context() 接受三个参数
  1、directory {String} 读取文件的路径
  2、useSubdirectories{Boolean} 是否遍历文件的子目录
  3、regExp{RegExp} 匹配文件的正则

  # 语法
  require.context(directory, useSubdirectories = false, regExp = /^.//)

  #  TODO: 自动化导入模块文件
  const modulesFiles = require.context('./modules', false, /\.js$/)

  const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // console.log(module, modulePath)
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    // console.log(moduleName)
    const value = modulesFiles(modulePath)
    // console.log(value)
    modules[moduleName] = value.default
    return modules
  }, {})

  // console.log(modules)

```

#### eslint 相关

- 忽略某一行代码检测

```bash

  # 代码后面加上 // eslint-disable-line

```

- 跳过多行

```bash

  # 代码前后分别加上 (/* eslint-disable */ /* eslint-enable */)

  /* eslint-disable */
  export function getAddressByLngLat (lng, lat) {
    return new Promise((resolve) => {
      let myGeo = new BMap.Geocoder()
      myGeo.getLocation(new BMap.Point(lng, lat), function (result) {
        if (result) {
          resolve(result)
        }
      })
    })
  }
  /* eslint-enable */

```

#### 前端模拟数据

- 使用 mockjs

```bash

  # 安装
  npm/cnpm i mockjs -S

  # 使用
  var Mock = require('mockjs')
  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|10': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        title: `商品名`
      }
    ]
  })

  console.log(JSON.stringify(data, null, 4))

```

- json-server(模仿后台接口)

```bash

  # 全局安装
  npm i json-server -g

  # 根目录创建db.json文件(如下的数据为示例数据)
  {
    “ posts ”：[
      { “ id ”：1，“ title ”：“ json-server ”，“ author ”：“ typicode ” }
    ]，“评论”：[
      { “ id ”：1，“ body ”：“一些评论“，” postId “：1 }

    ]，“ profile ”：{ “ name ”：“ typicode ” }
  }

  # 启动json-server
  json-server --watch db.json

  # 访问http：// localhost：3000 / posts / 1
  得到 { “ id ”：1，“ title ”：“ json-server ”，“ author ”：“ typicode ” }

```

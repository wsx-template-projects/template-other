# vue3.0 初始一

-   参考地址

```bash
https://juejin.cn/post/6867123074148335624

```

## 常用 api

-   setup

```bash

setup 函数提供了两个参数 props 和 context,重要的是在 setup 函数里没有了 this,在 vue3.0 中，访问他们变成以下形式： this.xxx=》context.xxx

我们没有了 this 上下文，没有了 Options API 的强制代码分离。Composition API 给了我们更加广阔的天地，那么我们更加需要慎重自约起来。

对于复杂的逻辑代码，我们要更加重视起 Composition API 的初心，不要吝啬使用 Composition API 来分离代码，用来切割成各种模块导出。

注意: setup 函数中只能是同步的，不能是异步的

```

```js
import useA from './a'
import useB from './b'

export default {
    setup(props) {
        let { a, methodsA } = useA()
        let { b, methodsB } = useA()

        return {
            a,
            methodsA,
            b,
            methodsB,
        }
    },
}
```

就算 setup 内容代码量越来越大，但是始终围绕着大而不乱，代码结构清晰的路子前进。

### 正确的 api 使用

```js
import { useRouter } from 'vue'
const router = useRouter() // 获取路由实例对象，注意：只能在setup或者功能组件中使用
const cr = router.currentRoute.value // 获取当前路由

import { useRoute } from 'vue'
const route = useRoute() // 只能在setup或者功能组件中使用
const query = route.query // 获取query传参
const params = route.params // 获取params传参
const path = route.path
const meta = route.meta
```

### 什么是 hooks? 为什么要用 hooks? hooks 有哪些特点? 什么场景下使用 hooks?

### 内置 hooks

```

1、useRouter ==> 通过该 hooks 可以用来实现路由的跳转，和 vue2.x this.$router 功能相同
2、useRoute ==> 通过该hooks可以用来获取路由跳转的参数，和vue2.x this.$route 功能相同
3、useStore ==> 通过该 hooks 可以用来获取 store,和 vue2.x this.$store 功能相同
```

### 自定义 hooks

```bash


```

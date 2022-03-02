# vue3.0 api

[vue3.0 官方文档] https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive

## 生命周期

beforeCreated 和 created 合并成了 setup

## 响应性基础 API

-   reactive (返回对象的响应式副本)

```bash

# 用法
const obj = reactive({ count: 0 })

# 注意
如下的案例：reactive 将解包所有深层的 refs，同时维持 ref 的响应性。

const count = ref(1)
const obj = reactive({ count })

// ref 会被解包
console.log(obj.count === count.value) // true

// 它会更新 `obj.count`
count.value++
console.log(count.value) // 2
console.log(obj.count) // 2

// 它也会更新 `count` ref
obj.count++
console.log(obj.count) // 3
console.log(count.value) // 3

# 特别重要 (这个目前不是很理解，需要进一步验证一下)
当将 ref 分配给 reactive property 时，ref 将被自动解包。

const count = ref(1)
const obj = reactive({})

obj.count = count

console.log(obj.count) // 1
console.log(obj.count === count.value) // true

```

## Refs

```bash
    # ref
    实质是一个响应性对象，该对象有一个value属性，通过.value来获取变量值，
    模板中显示不需要通过.value获取

    # unref

    # toRef

    # toRefs

    # isRef

    # customRef

    # shallowRef

    # triggerRef

```

## data

```bash

    # ref

    # reactive
    const obj = reactive({ count: 0 })

    注意：使用 reactive 组合函数时必须始终保持对这个所返回对象的引用以保持响应性。这个对象不能被解构或展开，一旦被解构或者展开，返回的值将失去响应式。

    可以通过 toRefs API 用来提供解决此约束的办法——它将响应式对象的每个 property 都转成了相应的 ref。



    # toRefs
```

## computed

```bash

```

## watch

```bash


```

## 内置 hooks

```bash


```

## 自定义 hooks

```bash


```

## 响应式系统

```bash


```

## setup

```bash

setup 函数提供了两个参数 props 和 context,重要的是在 setup 函数里没有了 this,在 vue3.0 中，访问他们变成以下形式： this.xxx=》context.xxx

我们没有了 this 上下文，没有了 Options API 的强制代码分离。Composition API 给了我们更加广阔的天地，那么我们更加需要慎重自约起来。

对于复杂的逻辑代码，我们要更加重视起 Composition API 的初心，不要吝啬使用 Composition API 来分离代码，用来切割成各种模块导出。

注意: setup 函数中只能是同步的，不能是异步的

切记、切记、切记 setup中没有this，该方法的生命周期是 介于 beforeCreated 和 created之间

```

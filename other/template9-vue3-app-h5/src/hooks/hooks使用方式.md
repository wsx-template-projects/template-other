#### useVisible

- 不涉及异步

```html
<van-dialog v-model:show="dialogVisible" title="标题" show-cancel-button>
  <img class="img" src="https://img.yzcdn.cn/vant/apple-3.jpg" />
</van-dialog>
```

```js

import { useVisible } from '@/hooks/childApi'

setup(props, ctx) {
  const visible = toRef(props, 'visible')
  const { dialogVisible } = useVisible(visible, ctx)

  onMounted(() => {})
  return {
    dialogVisible
  }
}

```

- 异步关闭 ———— 不涉及请求(点击确定按钮后，默认 1s 后关闭)

```html
<van-dialog v-model:show="dialogVisible" title="标题" show-cancel-button :beforeClose="beforeClose">
  <img class="img" src="https://img.yzcdn.cn/vant/apple-3.jpg" />
</van-dialog>
```

```js

import { useVisible } from '@/hooks/childApi'

setup(props, ctx) {
  const visible = toRef(props, 'visible')
  const { dialogVisible, beforeClose } = useVisible(visible, ctx)

  onMounted(() => {})
  return {
    dialogVisible,
    beforeClose
  }
}

```

- 异步关闭 ———— 涉及到请求(点击确定按钮后，执行请求)

```html
<van-dialog v-model:show="dialogVisible" title="标题" show-cancel-button :beforeClose="onBeforeClose">
  <img class="img" src="https://img.yzcdn.cn/vant/apple-3.jpg" />
</van-dialog>
```

```js

import { useVisible } from '@/hooks/childApi'

setup(props, ctx) {

  const visible = toRefs(props, 'visible')

  const { dialogVisible, beforeClose } = useVisible(visible, ctx)

  const onBeforeClose = (action) => {
    return beforeClose(action, (resolve) => {
      // TODO: 此处处理请求操作
      setTimeout(() => {
        resolve(true)
      }, 2000)
    })
  }

  return {
    dialogVisible,
    onBeforeClose
  }
}


```

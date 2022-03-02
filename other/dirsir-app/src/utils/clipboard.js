// 复制内容
import Vue from 'vue'
import Clipboard from 'clipboard'
import { Toast } from 'vant'

function clipboardSuccess() {
  Toast({
    message: '复制成功',
    position: 'middle',
    duration: 1500
  })
}

function clipboardError() {
  Toast({
    message: '复制失败',
    position: 'middle',
    duration: 1500
  })
}

function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  clipboard.onClick(event)
}

/**
 * 复制内容
 */
export default handleClipboard

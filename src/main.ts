import { createPinia } from 'pinia'
import { createApp } from 'vue'
import {
  VxeInput,
  VxeLoading,
  VxeTooltip,
  VxeUI,
} from 'vxe-pc-ui'
import {
  VxeColgroup,
  VxeColumn,
  VxeTable,
} from 'vxe-table'
import zhCN from 'vxe-table/lib/locale/lang/zh-CN'
import App from './App.vue'

import router from './router'
// 引入基础样式
import 'vxe-pc-ui/styles/base.scss'
// 按需引入组件样式
import 'vxe-pc-ui/styles/components/input.scss'
import 'vxe-pc-ui/styles/components/tooltip.scss'
import 'vxe-table/lib/style.css'
import './assets/main.css'

const app = createApp(App)

function lazyUI(app) {
  app.use(VxeInput)
  app.use(VxeTooltip)
  app.use(VxeUI)
  app.use(VxeLoading)
  VxeUI.setI18n('zh-CN', zhCN)
  VxeUI.setLanguage('zh-CN')
}
function lazyVexTable(app) {
  app.use(VxeTable)
  app.use(VxeColumn)
  app.use(VxeColgroup)
}
app.use(createPinia())
app.use(router)
app.use(lazyUI)
app.use(lazyVexTable)

app.mount('#app')

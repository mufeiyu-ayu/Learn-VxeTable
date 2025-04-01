import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import {
  Loading,
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

import 'element-plus/dist/index.css'
import 'vxe-table/lib/style.css'
// import 'vxe-table/styles/loading.css'
import 'vxe-pc-ui/lib/style.css'
import './assets/main.css'

const app = createApp(App)

function lazyUI(app) {
  app.use(VxeInput)
  app.use(VxeTooltip)
  app.use(VxeUI)
  app.use(VxeLoading)
  app.use(Loading)
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
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')

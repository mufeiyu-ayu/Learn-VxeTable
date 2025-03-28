import { createPinia } from 'pinia'
import { createApp } from 'vue'
import {
  VxeInput,
  VxeTooltip,
} from 'vxe-pc-ui'
import {
  VxeColgroup,
  VxeColumn,
  VxeTable,
} from 'vxe-table'
import App from './App.vue'
import router from './router'
// import 'vxe-pc-ui/lib/style.css'
import 'vxe-table/lib/style.css'

import './assets/main.css'

const app = createApp(App)

function lazyUI(app) {
  app.use(VxeInput)
  app.use(VxeTooltip)
  app.use()
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

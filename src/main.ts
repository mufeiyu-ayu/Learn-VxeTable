import ElementPlus from 'element-plus'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import VxeUITable from 'vxe-table'
import App from './App.vue'
import router from './router'
import 'vxe-table/lib/style.css'
import 'element-plus/dist/index.css'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(VxeUITable)
app.mount('#app')

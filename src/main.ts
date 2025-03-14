import { createPinia } from 'pinia'
import { createApp } from 'vue'
import VxeUIAll from 'vxe-pc-ui'
import VxeUITable from 'vxe-table'
import App from './App.vue'
import router from './router'
import 'vxe-pc-ui/lib/style.css'
import 'vxe-table/lib/style.css'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VxeUIAll)
app.use(VxeUITable)

app.mount('#app')

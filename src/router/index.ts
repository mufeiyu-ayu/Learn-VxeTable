import Learn1 from '@/views/basic/index.vue'
import Learn3 from '@/views/checkbox/index.vue'
import Edit from '@/views/edit/index.vue'
import LinRui from '@/views/linrui/index.vue'
import Login from '@/views/login/index.vue'
import Learn2 from '@/views/mergeCells/index.vue'
import Tsx from '@/views/tsx/index.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login,
    },
    {
      path: '/learn1',
      name: 'learn1',
      component: Learn1,
    },
    {
      path: '/learn2',
      name: 'learn2',
      component: Learn2,
    },
    {
      path: '/learn3',
      name: 'learn3',
      component: Learn3,
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit,
    },
    {
      path: '/tsx',
      name: 'tsx',
      component: Tsx,
    },
    {
      path: '/linrui',
      name: 'linrui',
      component: LinRui,
    },
  ],
})

export default router
// hello world

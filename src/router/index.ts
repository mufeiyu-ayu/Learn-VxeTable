import Learn1 from '@/views/basic/index.vue'
import Learn3 from '@/views/checkbox/index.vue'
import Learn2 from '@/views/mergeCells/index.vue'
import Learn4 from '@/views/render/index.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Learn1,
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
      path: '/learn4',
      name: 'learn4',
      component: Learn4,
    },
  ],
})

export default router
// hello world

import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import Index from '@/views/Index/index.vue'
console.log('BASE_URL', import.meta.env.BASE_URL)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '/',
      children: [
        {
          path: '/',
          name: 'index',
          component: Index,
        },
      ],
    },
  ],
})

export default router

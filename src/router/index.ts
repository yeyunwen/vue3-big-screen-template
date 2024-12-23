import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index/index.vue'

console.log('BASE_URL', import.meta.env.BASE_URL)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
    },
  ],
})

export default router

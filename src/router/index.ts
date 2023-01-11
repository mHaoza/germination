import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-layout',
      component: () => import('@/layouts/home-layout/home-layout.vue')
    },
    {
      path: '/post',
      name: 'post-layout',
      component: () => import('@/layouts/post-layout/post-layout.vue')
    }
  ]
})

export default router

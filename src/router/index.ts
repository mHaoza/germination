import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomePage/HomePage.vue')
    },
    {
      path: '/post',
      name: 'post-layout',
      component: () => import('@/layouts/PostLayout/PostLayout.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const routes = router.getRoutes()
  const paths = routes.map((route) => route.path)

  if (paths.includes(to.path)) {
    next()
    return
  }

  console.log('no page')
})

export default router

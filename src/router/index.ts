import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { ComponentOptions } from 'vue'

const importModules = import.meta.glob('../../docs/**/*.md', {
  eager: true
}) as Record<string, { default: ComponentOptions; frontmatter: any }>

const postRoutes: RouteRecordRaw[] = Object.keys(importModules).map((path) => {
  const fileName = path.split('/').splice(-1)[0].split('.')[0]

  return {
    name: fileName,
    path: fileName,
    meta: { frontmatter: importModules[path].frontmatter },
    component: importModules[path].default
  }
})

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/layouts/HomeLayout/HomeLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/HomePage/HomePage.vue'),
        alias: '/'
      }
    ]
  },
  {
    path: '/post',
    name: 'post-layout',
    component: () => import('@/layouts/PostLayout/PostLayout.vue'),
    children: [
      {
        path: '/list',
        component: () => import('@/views/PostPage/PostPage.vue'),
        alias: ''
      },
      ...postRoutes
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutPage/AboutPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
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

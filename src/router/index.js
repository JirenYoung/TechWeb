import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/articles', name: 'Articles', component: () => import('@/views/Articles.vue') },
  { path: '/article/:id', name: 'ArticleDetail', component: () => import('@/views/ArticleDetail.vue') },
  { path: '/about', name: 'About', component: () => import('@/views/About.vue') },
  { path: '/archive', name: 'Archive', component: () => import('@/views/Archive.vue') },
  { path: '/tags', name: 'Tags', component: () => import('@/views/Tags.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

export default router

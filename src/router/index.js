import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Articles from '@/views/Articles.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import About from '@/views/About.vue'
import Archive from '@/views/Archive.vue'
import Tags from '@/views/Tags.vue'
import Write from '@/views/Write.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/articles', name: 'Articles', component: Articles },
  { path: '/article/:id', name: 'ArticleDetail', component: ArticleDetail },
  { path: '/about', name: 'About', component: About },
  { path: '/archive', name: 'Archive', component: Archive },
  { path: '/tags', name: 'Tags', component: Tags },
  { path: '/write', name: 'Write', component: Write },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ArticleDetail from '@/components/ArticleDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/work',
      name: 'work',
      component: () => import('@/views/Work.vue'),
      children: [
        {
          path: ':topic',
          component: ArticleDetail,
          props: route => ({ topic: route.params.topic }) // 可选：传参
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue')
    }
  ],
})

export default router

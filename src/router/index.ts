import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

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
          path: 'article',
          name: 'article',
          component: () => import('@/views/tabs/Articles.vue'),
          children: [
            {
              path: ':category',
              name: 'category',
              component: () => import('@/components/ArticleDetail.vue'), // html css之类的分类
            }
          ]
        },
        {
          path: 'article-page',
          name: 'article-page',
          component: () => import('@/views/ArticlePage.vue')
        },
        {
          path: 'project',
          component: () => import('@/views/tabs/Projects.vue')
        }
        ,{
          path: 'demo',
          component: () => import('@/views/tabs/Demos.vue')
        },
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

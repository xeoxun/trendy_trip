import { createRouter, createWebHistory } from 'vue-router'
import UserPage from '@/components/travelpick.vue' // 분리할 컴포넌트

const routes = [
  {
    path: '/user',
    name: 'UserPage',
    component: UserPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
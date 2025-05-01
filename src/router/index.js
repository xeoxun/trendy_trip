import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/main.vue'  // 지도
import UserPage from '@/views/userPage.vue'  // 사용자 선택 초기 화면
import HomePage from '@/views/homePage.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/user',
    component: UserPage,
  },
  {
    path: '/main',
    component: MainPage,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router;
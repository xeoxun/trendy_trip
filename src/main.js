import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'

import VCalendar from 'v-calendar'; // 달력 모듈
import 'v-calendar/style.css';

createApp(App).use(router).use(VCalendar, {}).mount('#app')
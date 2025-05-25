import { createApp } from 'vue'
import { createPinia } from 'pinia'  // 데이터 저장

import App from './App.vue'
import router from './router'

import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

import 'vuetify/styles' // Vuetify 스타일 import
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(router).use(vuetify).use(VCalendar, {}).use(createPinia()).mount('#app')
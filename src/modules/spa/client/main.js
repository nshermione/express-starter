// add the beginning of your app entry
import 'vite/modulepreload-polyfill'

import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { router } from './Routes.js';

const pinia = createPinia()
export const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app');
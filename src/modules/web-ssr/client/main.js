// add the beginning of your app entry
import 'vite/modulepreload-polyfill'

import App from './App.vue'
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'

import { router } from './Routes.js';
import { BOVuePlugin } from '../../../plugins/client/BOVue/BOVuePlugin.js';

const pinia = createPinia()
export const app = createSSRApp(App)
app.use(router)
app.use(pinia)
app.use(BOVuePlugin)
app.mount('#app');
// add the beginning of your app entry


import App from './client/App.vue'
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'

import { router } from './client/Routes.js';
import { BOVuePlugin } from '../../plugins/client/BOVue/BOVuePlugin.js';

export function createApp() {
  const pinia = createPinia()
  const app = createSSRApp(App)
  app.use(router)
  app.use(pinia)
  app.use(BOVuePlugin)
  return { app, router };
}
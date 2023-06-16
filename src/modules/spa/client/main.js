// add the beginning of your app entry
import 'vite/modulepreload-polyfill'

import App from './App.vue'
import { createApp } from 'vue'

export const app = createApp(App)
app.mount('#app');
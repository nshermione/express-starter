import 'vite/modulepreload-polyfill'
import { createApp } from '../main.js'

const { app, router } = createApp()

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  app.mount('#app')
  console.log('hydrated')
})

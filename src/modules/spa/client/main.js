// add the beginning of your app entry
import 'vite/modulepreload-polyfill'

import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import { router } from './Routes'
import Button from "primevue/button"

//theme
import "primevue/resources/themes/soho-dark/theme.css";     
    
//core
import "primevue/resources/primevue.min.css";

const pinia = createPinia()

export const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(PrimeVue)

app.component('Button', Button);
app.mount('#app');
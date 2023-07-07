import { createRouter, createWebHistory } from "vue-router";
import AboutVue from "./pages/About.vue"
import HomeVue from "./pages/Home.vue"

const routes = [
  { path: '/', component: HomeVue },
  { path: '/about', component: AboutVue },
]

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})
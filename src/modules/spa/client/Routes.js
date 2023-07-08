import { createRouter, createWebHistory } from "vue-router";
import AboutVue from "./pages/About.vue"
import HomeVue from "./pages/Home.vue"

const routes = [
  { path: '/', component: HomeVue },
  { path: '/about', component: AboutVue },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
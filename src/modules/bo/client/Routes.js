import { createRouter, createWebHistory } from "vue-router";
import About from "./pages/About.vue"
import Home from "./pages/Home.vue"
import Notfound from "./pages/Notfound.vue"

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/:pathMatch(.*)*', component: Notfound },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
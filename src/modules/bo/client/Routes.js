import { createRouter, createWebHistory } from "vue-router";
import Notfound from "./pages/Notfound.vue"
import DashboardVue from "./pages/Dashboard.vue";
import AboutVue from "./pages/About.vue";
import NotfoundVue from "./pages/Notfound.vue";

const routes = [
  { path: '/', component: DashboardVue },
  { path: '/about', component: AboutVue },
  { path: '/:pathMatch(.*)*', component: NotfoundVue },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
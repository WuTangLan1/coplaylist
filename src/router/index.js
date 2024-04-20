import { createRouter, createWebHistory } from 'vue-router'

import homeView from '../views/homeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: homeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/sleep',
      name: 'sleep',
      component: () => import('../views/SleepView.vue'),
    },
    {
      path: '/reward',
      name: 'reward',
      component: () => import('../views/AwardView.vue'),
    },
    {
      path: '/dex',
      name: 'dex',
      component: () => import('../views/PokedexView.vue'),
    },
    {
      path: '/sign',
      name: 'sign',
      component: () => import('../views/SignInView.vue'),
    },
  ],
})

export default router

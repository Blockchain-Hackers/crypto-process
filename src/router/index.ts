import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login.vue'
import Register from '@/views/register.vue'
import Home from '@/views/index.vue'
import Accounts from '@/views/accounts.vue'
import { LayoutTypes } from '@/types/layouts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        layout: LayoutTypes.Empty
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        layout: LayoutTypes.Empty
      }
    },
    {
      path: '/',
      name: 'index',
      component: Home,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: Accounts,
      meta: {
        requiresAuth: true,
      }
    },
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login.vue'
import Register from '@/views/register.vue'
import Home from '@/views/index.vue'
import { LayoutTypes } from '@/types/layouts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home,
      meta: {
        requiresAuth: true,
      }
    },
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
  ]
})

export default router

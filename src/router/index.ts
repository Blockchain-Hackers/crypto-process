import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login.vue'
import Register from '@/views/register.vue'
import Home from '@/views/index.vue'
import Accounts from '@/views/accounts.vue'
import { LayoutTypes } from '@/types/layouts';
import { useAuthStore } from '@/stores/auth'

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

router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: '/login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }

  // if logged in redirect to index
  if ((to.name === 'login' || to.name === 'register') && authStore.isLoggedIn) {
    return {
      path: '/',
    }
  }
})

export default router

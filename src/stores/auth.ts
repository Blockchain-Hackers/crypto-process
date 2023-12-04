import { defineStore } from 'pinia';
import { useCookies } from '@vueuse/integrations/useCookies'
import type { User } from '@/types/auth';

const cookies = useCookies(['user'])
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: cookies.get<boolean>('isLoggedIn') || false,
    user: cookies.get<User>('user') || null,
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    login() {
      this.isLoggedIn = true;
      cookies.set('isLoggedIn', true);
    },
    logout() {
      this.isLoggedIn = false;
      cookies.remove('isLoggedIn');
      cookies.remove('user');
    },
  }
});
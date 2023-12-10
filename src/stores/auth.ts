import type { User } from "@/types/auth";
import { defineStore } from "pinia";
import { useCookies } from "@vueuse/integrations/useCookies";
import { useWorkflowStore } from './workflow';
import axios from 'axios';

const cookies = useCookies(["user"]);
export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: cookies.get<boolean>("isLoggedIn") || false,
    user: cookies.get<User>("user") || null,
    token: cookies.get<string>("token") || null,
  }),
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
  },
  actions: {
    login(payload: { email: string; password: string }) {
      return new Promise(async (resolve, reject) => {
        try {
          const {data} = await axios.post('/v1/auth/login', payload) as {
            data: {
              access_token: string;
              user: User;
            }
          }
          const {access_token, user} = data;
          cookies.set("isLoggedIn", true);
          cookies.set("user", user);
          cookies.set("token", access_token);
          this.isLoggedIn = true;
          this.user = user;
          this.token = access_token;
          resolve(data);
        } catch (error) {
          reject(error)
        }
      })
    },
    logout() {
      this.isLoggedIn = false;
      cookies.remove("isLoggedIn");
      cookies.remove("user");
      cookies.remove("token");
      const workflowStore = useWorkflowStore();
      workflowStore.clearWorkflowCreation();
      setTimeout(() => window.location.reload())
    },
  },
});

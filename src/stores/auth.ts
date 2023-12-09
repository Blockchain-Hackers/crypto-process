import type { User } from "@/types/auth";
import { defineStore } from "pinia";
import { useCookies } from "@vueuse/integrations/useCookies";

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
    login(access_token: string) {
      this.isLoggedIn = true;
      cookies.set("isLoggedIn", true);
      cookies.set("token", access_token);
      // set token
      this.token = access_token;
    },
    logout() {
      this.isLoggedIn = false;
      cookies.remove("isLoggedIn");
      cookies.remove("user");
      cookies.remove("token");
      window.location.reload();
    },
  },
});

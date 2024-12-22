import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    role: 'admin', 
  }),
  actions: {
    setToken(newToken) {
      this.token = newToken;
    },
    setRole(newRole) {
      this.role = newRole;
    },
    clearAuth() {
      this.token = '';
      this.role = 'user'; 
    },
  },
});

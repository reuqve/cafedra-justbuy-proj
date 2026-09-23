import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const Auth = defineStore('auth', () => {
  const token = ref(localStorage.getItem('user_token'));

  const isAuthenticated = computed(() => Boolean(token.value));

  function login(newToken) {
    token.value = newToken;
    localStorage.setItem('user_token', newToken);
  }

  function logout() {
    token.value = null;
    localStorage.removeItem('user_token');
  }

  return {
    token,
    isAuthenticated,
    login,
    logout
  }
})

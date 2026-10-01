<script setup>
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import AppToast from "@/components/AppToast.vue"
import { useToastStore } from "@/stores/toast.js";

const authStore = useAuthStore();
const router = useRouter();
const toastStore = useToastStore();

const { isAuthenticated } = storeToRefs(authStore);

const logoutAction = async () => {
  try {
    await authStore.logout();
    toastStore.showToast("Выход из аккаунта", "success");
    router.push('/login')
  } catch {
    toastStore.showToast("Ошибка выхода", "error")
  }
}
</script>

<template>
  <header class="bg-zinc-800">
    <div class="max-w-7xl mx-auto flex items-center justify-between h-20 text-zinc-100">
      <RouterLink :to="{name:'Catalog'}">
        <span>Просто купить</span>
      </RouterLink>
      <RouterLink class="text-yellow-600 hover:text-yellow-700 transition-colors duration-200"
                  :to="{name:'Login'}"
                  v-show="!isAuthenticated">Войти</RouterLink>
      <RouterLink class="text-yellow-600 hover:text-yellow-700 transition-colors duration-200"
                  :to="{name:'Registration'}"
                  v-show="!isAuthenticated">Регистрация</RouterLink>
      <RouterLink class="text-yellow-600 hover:text-yellow-700 transition-colors duration-200"
                  :to="{name:'Cart'}"
                  v-show="isAuthenticated">Корзина</RouterLink>
      <RouterLink class="text-yellow-600 hover:text-yellow-700 transition-colors duration-200"
                  :to="{name:'Orders'}"
                  v-show="isAuthenticated">Заказы</RouterLink>
      <button
        class="bg-blue-600 hover:bg-blue-400 w-30 h-10 rounded-2xl cursor-pointer mt-5 transition-colors duration-200"
        @click="logoutAction()"
        v-show="isAuthenticated">Выйти</button>
    </div>
  </header>
  <main class="bg-zinc-950">
    <AppToast/>
    <router-view></router-view>
  </main>
</template>

<style scoped></style>

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
  <header>
    <RouterLink :to="{name:'Catalog'}">
      <span>Просто купить</span>
    </RouterLink>
    <RouterLink :to="{name:'Login'}" v-show="!isAuthenticated">Войти</RouterLink>
    <RouterLink :to="{name:'Registration'}" v-show="!isAuthenticated">Регистрация</RouterLink>
    <RouterLink :to="{name:'Cart'}" v-show="isAuthenticated">Корзина</RouterLink>
    <RouterLink :to="{name:'Orders'}" v-show="isAuthenticated">Заказы</RouterLink>
    <button @click="logoutAction()" v-show="isAuthenticated">Выйти</button>
  </header>
  <main>
    <AppToast/>
    <router-view></router-view>
  </main>
</template>

<style scoped></style>

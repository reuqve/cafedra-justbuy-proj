<script setup>
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import AppToast from "@/components/AppToast.vue"

const authStore = useAuthStore();
const router = useRouter();
const { isAuthenticated } = storeToRefs(authStore);

const logoutAction = async () => {
  await authStore.logout();
  router.push('/login')
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

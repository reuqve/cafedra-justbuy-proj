<script setup>

</script>

<template>
  <header>
    <span>Просто купить</span>
    <RouterLink :to="{name:'Login'}">Войти</RouterLink>
    <RouterLink :to="{name:'Registration'}">Регистрация</RouterLink>
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped></style>

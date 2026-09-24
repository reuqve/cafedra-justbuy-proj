<script setup>
</script>

<template>
  <header>
    <span>Просто купить</span>
    <RouterLink :to="{name:'Login'}">Войти</RouterLink>
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped></style>

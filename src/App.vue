<script setup>

</script>

<template>
  <header>
    <RouterLink :to="{name:'Catalog'}">
      <span>Просто купить</span>
    </RouterLink>
    <RouterLink :to="{name:'Login'}">Войти</RouterLink>
    <RouterLink :to="{name:'Registration'}">Регистрация</RouterLink>
    <RouterLink :to="{name:'Cart'}">Корзина</RouterLink>
    <RouterLink :to="{name:'Orders'}">Заказы</RouterLink>
  </header>
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped></style>

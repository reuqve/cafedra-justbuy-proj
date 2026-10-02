<script setup>
  const emit = defineEmits(['retry']);
</script>

<template>
  <div class="error">
    <h2 class="text-lg text-red-400">Ошибка получения товаров с api</h2>
    <button
      class="text-zinc-200 bg-blue-600 hover:bg-blue-400 disabled:hover:bg-blue-600 w-50 h-10 rounded cursor-pointer mt-5 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      @click="emit('retry')">
      Повторить
    </button>
  </div>
</template>

<style scoped>

</style>

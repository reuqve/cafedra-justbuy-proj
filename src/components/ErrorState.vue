<script setup>
  const emit = defineEmits(['retry']);
</script>

<template>
  <div class="error">
    <h2>Fetch api error</h2>
    <button @click="emit('retry')">
      Повторить
    </button>
  </div>
</template>

<style scoped>

</style>

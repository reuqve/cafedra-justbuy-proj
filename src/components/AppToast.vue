<script setup>
import { useToastStore } from "@/stores/toast.js"

const toastStore = useToastStore()

</script>

<template>
<div v-if="toastStore.isShow" :class="`toast-${toastStore.type}`">
  <h2>Toast</h2>
  <p>{{ toastStore.message }}</p>
  <button @click="toastStore.hideToast()">x</button>
</div>
</template>

<style scoped>

</style>

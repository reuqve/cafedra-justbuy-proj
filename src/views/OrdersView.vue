<script setup>
import { useOrderStore } from "@/stores/order.js";
import {onMounted} from "vue";

const orderStore = useOrderStore();

onMounted(() => {
  orderStore.getOrderList()
})


</script>

<template>
  <section>
    <h1>Orders View</h1>
    <div v-for="order in orderStore.items" :key="order.id">
      <h2>{{ order.products }}</h2>
      <p>Price: {{ order.order_price}}</p>
    </div>
  </section>
</template>

<style scoped>

</style>

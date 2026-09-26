<script setup>
import {useCartStore} from "@/stores/cart.js";
import {onMounted} from "vue";

const cartStore = useCartStore();
const image_base_url = "http://lifestealer86.ru/"

onMounted(() => {
  cartStore.loadCart();
})
</script>

<template>
  <section>
    <h1>Cart View</h1>
    <div v-for="item in cartStore.groupItems" :key="item.id">
      <img v-if="item.image" :src="image_base_url + item.image" alt="" class="product-image">
      <h3>{{ item.name }}</h3>
      <p>description: {{ item.description }}</p>
      <p>price: {{ item.price }}</p>
      <p>quantity: {{ item.quantity || 0}}</p>
      <p>total: {{ item.price * item.quantity }}</p>
      <button @click="cartStore.addToCart(item.product_id)">+</button>
      <button @click="cartStore.deleteFromCart(item.id)">-</button>
      <button @click="cartStore.deleteProductFromCart(item.product_id)">Удалить</button>
    </div>
    <div>
      <h2>Total: <span>{{ cartStore.totalSum }}</span></h2>
    </div>
  </section>
</template>

<style scoped>
.product-image {
  width: 120px;
  height: 100px;
}
</style>

<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cart.js";
import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore();
const authStore = useAuthStore();

const { isAuthenticated } = storeToRefs(authStore);

const isAddedToCart = computed(() => {
  return cartStore.items.some(item => item.product_id === props.product.id)
})

const addToCart = async (product_id) => {
  await cartStore.addToCart(product_id)
}

const image_base_url = "http://lifestealer86.ru/";
</script>

<template>
  <div>
    <img v-if="product.image" :src="image_base_url + product.image" alt="" class="product-image">
    <h3>{{ product.name }}</h3>
    <p>description: {{ product.description }}</p>
    <p>price: {{ product.price }}</p>
    <span>id {{ product.id }}</span>
    <button @click="addToCart(product.id)" v-show="isAuthenticated" :disabled="isAddedToCart">{{ !isAddedToCart ? "Добавить в корзину" : "В корзине" }}</button>
  </div>

</template>

<style scoped>
.product-image {
  width: 120px;
  height: 100px;
}
</style>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})

const image_base_url = "http://lifestealer86.ru/";
</script>

<template>
  <div>
    <img v-if="product.image" :src="image_base_url + product.image" alt="" class="product-image">
    <h3>{{ product.name }}</h3>
    <p>description: {{ product.description }}</p>
    <p>price: {{ product.price }}</p>
    <span>id {{ product.id }}</span>
  </div>

</template>

<style scoped>
.product-image {
  width: 120px;
  height: 100px;
}
</style>

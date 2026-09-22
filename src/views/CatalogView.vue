<script setup>
  import { ref, onMounted } from "vue"
  import getProducts from "@/services/products"

  const products = ref([])
  const loading = ref(true)
  const error = ref(false)

  const fetchProducts = async () => {
    try {
      products.value = await getProducts();
    } catch (err) {
      error.value = true
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchProducts()
  })

</script>

<template>
  <section>
    <h1>Catalog View</h1>
    <div v-if="loading">
      <h2>loading...</h2>
    </div>
    <div v-else-if="error">
      <h2>error fetch</h2>
    </div>
    <div v-else>
      <div v-for="product in products" :key="product.id" class="products">
        <h3>{{ product.name }}</h3>
        <p>description: {{ product.description }}</p>
        <p>price: {{ product.price }}</p>
        <span>id {{ product.id }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>

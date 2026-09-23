<script setup>
  import { ref, onMounted } from "vue"
  import getProducts from "@/services/products"
  import ProductCard from "@/components/ProductCard.vue"
  import Skeleton from "@/components/Skeleton.vue"
  import EmptyState from "@/components/EmptyState.vue"
  import ErrorState from "@/components/ErrorState.vue"

  const products = ref([])
  const loading = ref(true)
  const error = ref(false)

  const fetchProducts = async () => {
    loading.value = true
    error.value = false

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
      <Skeleton/>
    </div>
    <div v-else-if="error">
      <ErrorState
        @retry="fetchProducts"
      />
    </div>
    <div v-else-if="products.length === 0">
      <EmptyState/>
    </div>
    <div v-else>
      <div class="products">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"/>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>

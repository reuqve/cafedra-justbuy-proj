<script setup>
import { useOrderStore } from "@/stores/order.js";
import { onMounted, ref } from "vue";
import getProducts from "@/services/products"

const orderStore = useOrderStore();

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

const groupOrderProducts = () => {
  const orderItems = orderStore.items
  const result = []

  for(const item of orderItems) {
    const products = item.products

    const groupedProducts = products.reduce((acc, product) => {
      if(!acc[product]) {
        acc[product] = {
          product: product,
          quantity: 1
        }
      } else {
        acc[product].quantity += 1
      }
      return acc
    }, {})
    const data = {
      order_id: item.id,
      products: groupedProducts,
      price: item.order_price,
    }
    result.push(data)
  }
  return result
}

const searchProducts = (orderData) => {
  const groupList = Object.values(orderData.products)

  const fullProducts = groupList.map((item) => {
    const foundProduct = products.value.find(product => {
        return product.id === item.product
    })
    return {
      name: foundProduct.name,
      product: item.product,
      quantity: item.quantity,
    }
  })
  return fullProducts
}

onMounted(() => {
  orderStore.getOrderList()
  fetchProducts()
})


</script>

<template>
  <section>
    <h1>Orders View</h1>
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else-if="error">
      <p>Something went wrong</p>
    </div>
    <div v-else-if="groupOrderProducts().length === 0">
      <p>Empty state...</p>
    </div>
    <div
      v-else
      v-for="order in groupOrderProducts()"
      :key="order.order_id">
        <h2>Номер заказа: №{{ order.order_id }}</h2>
        <h3>Цена: {{ order.price }}</h3>
        <ul>
          <li
            v-for="item in searchProducts(order)"
            :key="item.product">
              <p>Название: {{ item.name }}</p>
              <p>Товар: {{ item.product }}</p>
              <p>Количество: {{ item.quantity }}</p>
          </li>
        </ul>
    </div>
  </section>
</template>

<style scoped>

</style>

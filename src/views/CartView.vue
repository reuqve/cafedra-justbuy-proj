<script setup>
import {useCartStore} from "@/stores/cart.js";
import {useOrderStore} from "@/stores/order.js";
import {onMounted} from "vue";
import { useRouter } from "vue-router";
import { useToastStore } from "@/stores/toast.js"

const cartStore = useCartStore();
const orderStore = useOrderStore();
const toastStore = useToastStore();

const router = useRouter();

const image_base_url = "http://lifestealer86.ru/"

const makeOrder = async () => {
  try {
    await orderStore.createOrder()
    toastStore.showToast("Заказ создан успешно", "success")
  } catch {
    toastStore.showToast("Ошибка создания заказа", "error")
    return;
  }
  await cartStore.loadCart()

  router.push('/orders')
}

onMounted(() => {
  cartStore.loadCart();
})
</script>

<template>
  <section class="text-zinc-200 min-h-screen max-w-7xl mx-auto pt-5">
    <h1 class="mb-8 text-4xl">Корзина</h1>
    <div class="mb-3" v-for="item in cartStore.groupItems" :key="item.id">
      <div class="item flex items-center gap-6 rounded-xl bg-zinc-900 p-4">
        <div>
          <img v-if="item.image" :src="image_base_url + item.image" alt="" class="w-32 h-24 object-contain rounded-lg">
        </div>
        <div class="flex flex-1 justify-between items-center">
          <div>
            <h3 class="text-lg font-semibold">{{ item.name }}</h3>
            <div class="flex items-center gap-3 mt-2">
              <button
                class="cursor-pointer w-8 h-8 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors duration-200"
                @click="cartStore.deleteFromCart(item.id)">
                -
              </button>
              <p>{{ item.quantity || 0}}</p>
              <button
                class="cursor-pointer w-8 h-8 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors duration-200"
                @click="cartStore.addToCart(item.product_id)">
                +
              </button>
            </div>
            <p class="mt-2 text-zinc-400 font-medium">{{ item.price }} &#8381;</p>
          </div>
          <button
            class="text-red-400 cursor-pointer hover:text-red-300 transition-colors duration-200"
            @click="cartStore.deleteProductFromCart(item.product_id)">
            Удалить
          </button>
        </div>
      </div>
    </div>
    <div class="mt-8 flex justify-end">
      <h2 class="text-xl font-semibold">Итого: <span class="text-2xl font-bold">{{ cartStore.totalSum }}</span></h2>
    </div>
    <div class="flex justify-end" v-if="cartStore.groupItems.length > 0">
      <button
        class="bg-blue-600 mt-5 px-6 py-3 font-semibold rounded-lg hover:bg-blue-500 transition-colors duration-200 cursor-pointer"
        @click="makeOrder()">
        Сделать заказ
      </button>
    </div>
  </section>
</template>

<style scoped>

</style>

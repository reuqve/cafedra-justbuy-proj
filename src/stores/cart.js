import { defineStore } from 'pinia'
import cart from "@/services/cart.js"
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const errorMessage = ref(null)
  const loading = ref(false)

  const loadCart = async () => {
    try {
      loading.value = true
      const response = await cart.getCart()
      items.value = response.data
      console.log(response.data)
    } catch (error) {
      errorMessage.value = error.message
      console.log(error)
    } finally {
      loading.value = false
    }

  }
  const groupItems = computed(() => {
    return Object.values(
      items.value.reduce((acc, item) => {
        const productId = item.product_id;
        if(!acc[productId]) {
          acc[productId] = {
            ...item,
            quantity: 1,
            cart_id: [item.id]
          }
        } else {
          acc[productId].cart_id.push(item.id)
          acc[productId].quantity += 1
        }
        return acc
      }, {})
    )
  })

  return {
    items,
    loadCart,
    groupItems,
  }
})

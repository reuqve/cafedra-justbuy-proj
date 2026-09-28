<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth.js"
import authService from "@/services/auth.js"
import { useToastStore } from "@/stores/toast.js"

const form = reactive({
  email: "",
  password: ""
})

const router = useRouter()
const store = useAuthStore()
const toastStore = useToastStore()

const isSubmitting = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  if(form.email !== "" && form.password !== "" && form.password.length < 6) {
    errorMessage.value = "Password must be at least 6 characters"
    return
  }
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const response = await authService.login(form)
    const token = response.data.user_token
    store.login(token)
    toastStore.showToast("Авторизация успешна!", "success")
    router.push("/")
  } catch {
    errorMessage.value = "Ошибка авторизации"
    toastStore.showToast("Ошибка авторизации", "error")
  }

  isSubmitting.value = false
}

</script>

<template>
  <section>
    <h1>Login View</h1>

    <form @submit.prevent="handleSubmit">
      <label>Email</label>
      <input
        v-model="form.email"
        type="text"
        placeholder="example@mail.com"
      >
      <label>Password</label>
      <input
        v-model="form.password"
        type="password"
        placeholder="password"
      >
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <input
        type="submit"
        placeholder="submit"
        :disabled="isSubmitting"
      >
    </form>
  </section>
</template>

<style scoped>

</style>

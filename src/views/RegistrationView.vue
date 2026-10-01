<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useAuth from "@/services/auth.js";
import { useToastStore } from "@/stores/toast.js"

const form = reactive({
  fio: "",
  email: "",
  password: "",
})

const router = useRouter()
const toastStore = useToastStore()

const errorMessage = ref("")
const isSubmitting = ref(false);

const handleSubmit = async () => {
  if(form.fio === "" || form.fio.length < 3 || form.email === "" || form.password === "" || form.password.length < 6) {
    errorMessage.value = "Поля пустые или пароль меньше 6 символов."
    isSubmitting.value = false
    return
  }

  isSubmitting.value = true
  try {
    await useAuth.signup(form)
    toastStore.showToast("Регистрация успешна!", "success")
    router.push("/login")
  } catch (error) {
    toastStore.showToast("Ошибка регистрации", "error")
    errorMessage.value = error.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="text-zinc-200 h-screen max-w-7xl mx-auto pt-5 flex flex-col items-center">
    <h1 class="mb-8 text-center text-4xl text-zinc-200">Регистрация</h1>
    <form
      class="flex flex-col items-center justify-center w-full max-w-md rounded-xl bg-zinc-900 p-8"
      @submit.prevent="handleSubmit"
    >
      <label class="font-medium text-zinc-300">ФИО</label>
      <input
        class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        v-model="form.fio"
        type="text"
        placeholder="fio"
      >
      <label class="font-medium text-zinc-300">Ваша почта</label>
      <input
        class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        v-model="form.email"
        type="email"
        placeholder="example@mail.com"
      >
      <label class="font-medium text-zinc-300">Пароль</label>
      <input
        class="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        v-model="form.password"
        type="password"
        placeholder="password"
      >
      <p class="text-red-400 text-sm" v-if="errorMessage">{{ errorMessage }}</p>
      <button
        class="bg-blue-600 mt-10 mt-5 px-6 py-2 font-semibold rounded-xl hover:bg-blue-500 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        :disabled="isSubmitting"
      >
        Зарегистрироваться
      </button>
    </form>
  </section>
</template>
<style scoped>

</style>

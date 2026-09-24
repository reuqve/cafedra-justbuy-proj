<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useAuth from "@/services/auth.js";

const form = reactive({
  fio: "",
  email: "",
  password: "",
})

const router = useRouter()

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
    router.push("/login")
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section>
    <h1>Registration View</h1>
  </section>
  <form @submit.prevent="handleSubmit">
    <label>ФИО</label>
    <input
      v-model="form.fio"
      type="text"
      placeholder="fio"
    >
    <label>Ваша почта</label>
    <input
      v-model="form.email"
      type="email"
      placeholder="example@mail.com"
    >
    <label>Пароль</label>
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

</template>
<style scoped>

</style>

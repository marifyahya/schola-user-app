<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const email = ref('')
const password = ref('')

const { login } = useAuth()

const onSubmit = async () => {
  await login(email.value, password.value)
  navigateTo('/') // redirect home
}
</script>

<template>
  <section>
    <h1>Login Page</h1>

    <div>
      <label for="email">Email</label>
      <input type="email" v-model="email" />
    </div>

    <div>
      <label for="password">Password</label>
      <input type="password" v-model="password" />
    </div>

    <div>
      <button @click="onSubmit">Login</button>
    </div>
  </section>
</template>

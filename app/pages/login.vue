<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui'

definePageMeta({ layout: 'blank' })

const fields = ref<AuthFormField[]>([
    { name: 'email', type: 'text', label: 'Email', required: true },
    { name: 'password', type: 'password', label: 'Password', required: true }
])

const { login } = useAuth()

const onSubmit = async (event: any) => {
    await login(event.data.email, event.data.password)
    navigateTo('/')
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center">
        <UAuthForm title="Login" :fields="fields" :submit="{ label: 'Login' }" @submit="onSubmit"
            class="max-w-md w-full" />
    </div>
</template>

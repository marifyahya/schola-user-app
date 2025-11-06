<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui'

definePageMeta({
    layout: 'blank'
})

const fields = ref<AuthFormField[]>([
    {
        name: 'email',
        type: 'text',
        label: 'Email'
    },
    {
        name: 'password',
        type: 'password',
        label: 'Password'
    }
])
</script>

<template>
    <div class="min-h-screen flex items-center justify-center">
        <UAuthForm title="Login" :fields="fields" class="max-w-md w-full" />
    </div>
</template>

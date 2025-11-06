import { useAuth } from "~/composables/useAuth"

export default defineNuxtPlugin(() => {
    const { token } = useAuth()
    const savedToken = localStorage.getItem('token')
    if (savedToken) token.value = savedToken
})

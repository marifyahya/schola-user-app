export default defineNuxtRouteMiddleware((to) => {
    if (!import.meta.client) return

    const { token } = useAuth()

    if (['/login', '/register'].includes(to.path)) return

    if (!token.value) {
        const savedToken = localStorage.getItem('token')
        if (savedToken) {
            token.value = savedToken
        } else {
            return navigateTo('/login')
        }
    }
})

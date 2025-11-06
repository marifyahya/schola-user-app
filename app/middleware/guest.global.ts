export default defineNuxtRouteMiddleware((to) => {
    if (!import.meta.client) return

    const { token } = useAuth()

    const guestPages = ['/login', '/register']

    if (guestPages.includes(to.path) && token.value) {
        return navigateTo('/')
    }
})

export default defineNuxtRouteMiddleware((to) => {
    const { token } = useAuth()
    const guestPages = new Set(['/login', '/register'])

    // logged in access guest page -> dash
    if (guestPages.has(to.path) && token.value) {
        return navigateTo('/')
    }

    // not logged in access protected -> login
    if (!guestPages.has(to.path) && !token.value) {
        return navigateTo('/login')
    }
})
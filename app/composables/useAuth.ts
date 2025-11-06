import { authApi } from '~/api/auth.api'

export const useAuth = () => {
    const token = useState<string | null>('token', () => null)
    const user = useState<any | null>('user', () => null)

    const login = async (email: string, password: string) => {
        const res = await authApi.login({ email, password })

        token.value = res.data.access_token
        localStorage.setItem('token', res.data.access_token)
        localStorage.setItem('refresh_token', res.data.refresh_token)
    }

    const fetchUser = async () => {
        const res = await authApi.profile()
        user.value = res.data
    }

    const logout = () => {
        token.value = null
        user.value = null
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')

        return navigateTo('/login')
    }

    return { token, login, user, fetchUser, logout }
}

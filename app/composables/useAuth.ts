import { authApi } from '~/api/auth.api'

export const useAuth = () => {
    const user = useState<any | null>('user', () => null)

    const token = useCookie<string | null>('token')

    const login = async (email: string, password: string) => {
        const res = await authApi.login({ email, password })
        token.value = res.data.access_token
    }

    const fetchUser = async () => {
        const res = await authApi.profile() as any
        user.value = res.data
    }

    const logout = () => {
        token.value = null
        user.value = null

        return navigateTo('/login')
    }

    return { token, login, user, fetchUser, logout }
}

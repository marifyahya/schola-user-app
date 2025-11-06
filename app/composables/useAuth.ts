import { authApi } from '~/api/auth.api'

export const useAuth = () => {
    const token = useState<string | null>('token', () => null)

    const login = async (email: string, password: string) => {
        const res = await authApi.login({ email, password })

        token.value = res.data.access_token
        localStorage.setItem('token', res.data.access_token)
        localStorage.setItem('refresh_token', res.data.refresh_token)
    }

    return { token, login }
}

import type { LoginResponse } from '~/types/loginResponse'
import { useApi } from '~/api/base'

export const authApi = {
    async login(payload: { email: string; password: string }): Promise<LoginResponse> {
        const api = useApi()
        return api('/login', {
            method: 'POST',
            body: payload
        })
    }
}

import { useApi } from '~/api/base'

export const authApi = {
    async login(payload: { email: string; password: string }): Promise<any> {
        const request = useApi()
        return request('/login', {
            method: 'POST',
            body: payload
        })
    },
    async profile() {
        const request = useApi()
        return request('/users/profile')
    }
}

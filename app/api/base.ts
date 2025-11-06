export const useApi = () => {
    const { public: { apiUrl } } = useRuntimeConfig()
    const { token } = useAuth()

    return $fetch.create({
        baseURL: apiUrl,
        onRequest({ options }) {
            if (token.value) {
                options.headers = {
                    ...(options.headers as any),
                    Authorization: `Bearer ${token.value}`
                }
            }
        }
    })
}

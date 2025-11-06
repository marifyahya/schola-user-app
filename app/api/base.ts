export const useApi = () => {
    const { public: { apiUrl } } = useRuntimeConfig()

    return $fetch.create({
        baseURL: apiUrl
    })
}

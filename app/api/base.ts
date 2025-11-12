import { useAuth } from "~/composables/useAuth";

export const useApi = () => {
  const {
    public: { apiUrl },
  } = useRuntimeConfig();
  const { token, refreshTokenRequest, logout } = useAuth();

  return $fetch.create({
    baseURL: apiUrl as string,
    onRequest({ request, options }) {
      const headers = new Headers(options.headers || {});
      headers.set("Accept", "application/json");

      if (!request.toString().includes("/refresh") && token.value) {
        headers.set("Authorization", `Bearer ${token.value}`);
      }

      options.headers = headers;
    },
    async onResponseError({ response, request, options }) {
      if (response.url.includes("/refresh")) {
        console.warn("Refresh token request failed → logout.");
        await logout();
        return;
      }

      try {
        if (response.status === 401) {
          const res = await refreshTokenRequest();
          const isSuccess =
            res && ((res.status && res.status === 200) || !res.status);

          if (isSuccess) {
            const newHeaders = new Headers(options.headers || {});
            newHeaders.set("Authorization", `Bearer ${res.data.access_token}`);

            const retryResponse = await $fetch.raw(response.url, {
              method: (options.method as any) || "GET",
              body: options.body,
              query: options.query,
              headers: newHeaders,
            });

            response._data = retryResponse._data;
            return;
          } else {
            logout();
          }
        }
      } catch (error) {}
    },
  });
};

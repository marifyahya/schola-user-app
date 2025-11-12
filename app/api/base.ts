import { useAuth } from "~/composables/useAuth";

let isRefreshing = false;
let refreshQueue: (() => void)[] = [];

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

    async onResponseError({ response, options }) {
      if (response.url.includes("/refresh")) {
        console.warn("Refresh token request failed → logout.");
        await logout();
        return;
      }

      // Handle expired access token
      if (response.status === 401) {
        // If another request is already refreshing the token, wait until it finishes
        if (isRefreshing) {
          await new Promise<void>((resolve) => refreshQueue.push(resolve));
        } else {
          isRefreshing = true;
          try {
            const res = await refreshTokenRequest();
            const isSuccess =
              res && ((res.status && res.status === 200) || !res.status);

            if (isSuccess) {
              // Notify all queued requests that the refresh has completed
              refreshQueue.forEach((resolve) => resolve());
              refreshQueue = [];
            } else {
              await logout();
              return;
            }
          } catch (err) {
            // If the refresh failed, log out the user
            await logout();
            return;
          } finally {
            isRefreshing = false;
          }
        }

        // Retry the original request with the new token
        const newHeaders = new Headers(options.headers || {});
        if (token.value) {
          newHeaders.set("Authorization", `Bearer ${token.value}`);
        }

        const retryResponse = await $fetch.raw(response.url, {
          method: (options.method as any) || "GET",
          body: options.body,
          query: options.query,
          headers: newHeaders,
        });

        // Replace the original response data with the retried on
        response._data = retryResponse._data;
        return;
      }
    },
  });
};

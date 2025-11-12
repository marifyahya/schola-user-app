import { authApi } from "~/api/auth.api";

export const useAuth = () => {
  const user = ref({
    name: "",
    email: "",
    avatar: {
      src: "",
      alt: "",
    },
  });

  const token = useCookie<string | null>("token");
  const refreshToken = useCookie<string | null>("refresh_token");

  const login = async (email: string, password: string) => {
    const res = await authApi.login({ email, password });
    token.value = res.data.access_token;
    refreshToken.value = res.data.refresh_token;
  };

  const fetchUser = async () => {
    const res = (await authApi.profile()) as any;
    const fetchedUser = res.data;

    const nameForUrl = encodeURIComponent(fetchedUser.name);
    const avatarUrl = `https://ui-avatars.com/api/?background=random&name=${nameForUrl}`;

    user.value = {
      ...user.value,
      name: fetchedUser.name,
      email: fetchedUser.email,
      avatar: {
        src: avatarUrl,
        alt: fetchedUser.name,
      },
    };
  };

  const logout = () => {
    token.value = null;
    refreshToken.value = null;

    return navigateTo("/login");
  };

  const refreshTokenRequest = async () => {
    if (!refreshToken.value) return await logout();

    const res = await authApi.refreshToken(refreshToken.value);
    const data = res._data ?? res.data;

    if (!data?.access_token) {
      console.warn("Failed to refresh token — missing data.");
      return null;
    }

    token.value = data.access_token;
    refreshToken.value = data.refresh_token;

    return res;
  };

  return { token, login, user, fetchUser, logout, refreshTokenRequest };
};

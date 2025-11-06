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

  const login = async (email: string, password: string) => {
    const res = await authApi.login({ email, password });
    token.value = res.data.access_token;
  };

  const fetchUser = async () => {
    const res = (await authApi.profile()) as any;
    const fetchedUser = res.data

    const nameForUrl = encodeURIComponent(fetchedUser.name)
    const avatarUrl = `https://ui-avatars.com/api/?background=random&name=${nameForUrl}`

    user.value = {
      ...user.value,
      name: fetchedUser.name,
      email: fetchedUser.email,
      avatar: {
        src: avatarUrl,
        alt: fetchedUser.name
      }
    }
  };

  const logout = () => {
    token.value = null;

    return navigateTo("/login");
  };

  return { token, login, user, fetchUser, logout };
};

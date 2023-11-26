export const getAccessToken = (name: string = "access_token"): string | null =>
  window.localStorage.getItem(name);

export const setAccessToken = (
  token: string,
  name: string = "access_token"
): void => window.localStorage.setItem("access_token", token);

export const removeAccessToken = (): void => localStorage.clear();

import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getAccessToken, setAccessToken } from "./jwt";

const url = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

const refresh = (): Promise<any> =>
  api.post(`${url}/api/refresh-token`).then((response) => {
    setAccessToken(response.data.accessToken);
    return Promise.resolve();
  });

createAuthRefreshInterceptor(api, refresh);

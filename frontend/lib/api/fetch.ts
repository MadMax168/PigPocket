import { api } from "./api";
import { authApi } from "./authApi";

export const fetch = (url : string) => api.get(url).then(res => res.data)
export const authFetch = (url : string) => authApi.get(url).then(res => res.data)
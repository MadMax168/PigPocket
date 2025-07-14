import axios from "axios"

export const authApi = axios.create({
  baseURL: "http://localhost:8000"
})

authApi.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

import axios from "axios";

export const authApi = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
})

export const signup = (data : {
    username: string
    email: string
    password: string
    confirmPassword?: string
}) => {
    return authApi.post("/register", {
        username: data.username,
        email: data.email,
        password: data.password,
    })
}

export const signin = async ({ username, password } : { username: string; password: string }) => {
  const res = await authApi.post("/login", {username, password})
  return res.data
}

export const getMe = async () => {
  const res = await authApi.get("/user/me")
  return res.data
}
import useSWR from "swr"
import { getMe } from "@/lib/api/authApi"

export const useUser = () => {
  const { data, error, isLoading } = useSWR("/user/me", getMe)

  return {
    user: data,
    isLoading,
    isError: error,
  }
}
import useSWR from "swr"
import { authFetch } from "@/lib/api/fetch"

export const useUser = () => {
  const { data, error, isLoading } = useSWR("/user/me", authFetch)

  return {
    user: data,
    isLoading,
    isError: error,
  }
}
import useSWR from "swr"
import { authFetch } from "@/lib/api/fetch"

export const useUser = () => {
  const { data, error, isLoading } = useSWR("/me", authFetch)

  return {
    user: data,
    isLoading,
    isError: error,
  }
}
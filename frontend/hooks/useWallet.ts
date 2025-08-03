import useSWR from "swr";
import { fetch } from "@/lib/api/fetch";

export const walletProf = () => {
    const { data, error, isLoading } = useSWR("/wallet/profile", fetch)

    return {
        walletProfile : data,
        isLoading,
        isError: error,
    }
}
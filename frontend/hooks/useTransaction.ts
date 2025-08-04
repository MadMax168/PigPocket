import useSWR from "swr";
import { fetch } from "@/lib/api/fetch";

export const TransTable = () => {
    const {data, error, isLoading} = useSWR("/transaction/sumtable", fetch)

    return {
        trandata : data,
        isLoading,
        isError : error,
    }
}

export const PayTable = () => {
    const {data, error, isLoading} = useSWR("/transaction/paytable", fetch)

    return {
        paydata : data,
        isLoading,
        isError : error,
    }
}
import useSWR from "swr";
import { fetch } from "@/lib/api/fetch";

export const useTransTable = () => {
    const {data, error, isLoading} = useSWR("/transaction/sumtable", fetch)

    return {
      trandata : data || [],
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

export const useSumCard = () => {
  const { data, error, isLoading } = useSWR("/sumcard", fetch)

  return {
    income: data?.income || 0,
    expense: data?.expense || 0,
    save: data?.save || 0,
    balance: (data?.income || 0) - (data?.expense || 0),
    isLoading,
    isError: error
  }
}

export const useAllSumCard = () => {
  const { data, error, isLoading } = useSWR("/allsumcard", fetch)

  return {
    income: data?.allincome || 0,
    expense: data?.allexpense || 0,
    save: data?.allsave || 0,
    balance: (data?.allincome || 0) - (data?.allexpense || 0),
    isLoading,
    isError: error
  }
}
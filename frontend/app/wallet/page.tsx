"use client"

import { AppSidebar } from "@/components/app-sidebar";
import { NavHeader } from "@/components/header";
import { SummaryCard } from "@/components/summary/summary-card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Profile } from "@/components/wallet/profile";
import { useAllSumCard } from "@/hooks/useTransaction";

export default function Wallet() {
    const { income, expense, balance, isLoading } = useAllSumCard()

    const percent = (value: number, base: number) => {
        if (base === 0) return 0
        return Math.round((value / base) * 100)
    }

    return (
        <SidebarProvider> 
            <AppSidebar />
            <div className="w-full flex flex-col gap-5 px-5">
                <NavHeader />
                {/* Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                        <SummaryCard title="All-Income" amount={income} percent={percent(income, income + expense)} />
                        <SummaryCard title="All-Expense" amount={expense} percent={percent(expense, income + expense)} />
                        <SummaryCard title="All-Balance" amount={balance} percent={percent(balance, income)} />
                        </>
                    )}
                </div>
                
                {/* Wallet Profile List */}
                <Profile />
            </div>
        </SidebarProvider>
    )
}
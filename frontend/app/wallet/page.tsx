import { AppSidebar } from "@/components/app-sidebar";
import { NavHeader } from "@/components/header";
import { SummaryCard } from "@/components/summary/summary-list";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Profile } from "@/components/wallet/profile";

export default function Wallet() {
    return (
        <SidebarProvider> 
            <AppSidebar />
            <div className="w-full flex flex-col gap-5 px-5">
                <NavHeader />
                {/* Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <SummaryCard title="All-Income" amount={45678.9} percent={20} />
                    <SummaryCard title="All-Expense" amount={2405} percent={33} />
                    <SummaryCard title="All-Balance" amount={10353} percent={-8} />
                </div>
                
                {/* Wallet Profile List */}
                <Profile />
            </div>
        </SidebarProvider>
    )
}
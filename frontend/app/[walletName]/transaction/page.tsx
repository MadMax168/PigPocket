import { AppSidebar } from "@/components/app-sidebar";
import { NavHeader } from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TranForm } from "@/components/transaction/transaction-form";
import { TranTable } from "@/components/transaction/transaction-list";
import { TransactionProvider } from "@/lib/context/transactionContext";

export default function Transaction() {
    return (
        <SidebarProvider> 
            <AppSidebar />
            <div className="w-full flex flex-col gap-5 px-5">
                <div>
                    <NavHeader />
                </div>
                <TransactionProvider>
                    <div className="flex flex-1 gap-5 pb-4">
                        <TranTable />
                        <TranForm />
                    </div>
                </TransactionProvider>
            </div>
        </SidebarProvider>
    )
}
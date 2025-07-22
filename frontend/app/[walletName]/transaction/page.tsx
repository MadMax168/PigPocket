import { AppSidebar } from "@/components/app-sidebar";
import { NavHeader } from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Transaction() {
    return (
        <SidebarProvider> 
            <AppSidebar />
            <div className="w-full flex flex-col gap-5 px-5">
                <NavHeader />
                
            </div>
        </SidebarProvider>
    )
}
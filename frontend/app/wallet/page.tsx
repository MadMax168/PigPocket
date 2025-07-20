import { AppSidebar } from "@/components/app-sidebar";
import { NavHeader } from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
    return (
        <SidebarProvider> 
            <AppSidebar />
            <NavHeader />
            <div>
                
            </div>
        </SidebarProvider>
    )
}
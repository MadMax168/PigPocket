import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { RegisterSwitch } from "@/components/register/register-box";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


export default function SignPage() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                </div>
                </header>
                <main className="h-full flex justify-center items-center">
                    <div className="w-1/2 h-4/5 mb-16">
                        <RegisterSwitch />
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
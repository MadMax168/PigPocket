import { AppSidebar } from "@/components/app-sidebar";
import { NavHeader } from "@/components/header";
import { SignForm } from "@/components/register/sign-in";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function Page() {
    return (
        <SidebarProvider> 
            <AppSidebar />
            <SidebarInset>
                <NavHeader />
                <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4 pt-0">
                    <div className="flex flex-col items-center space-y-15 mb-20">
                        <div className="text-2xl font-extrabold">
                            Pig Pocket
                        </div>
                        <SignForm />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
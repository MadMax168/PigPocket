import { AppSidebar } from "@/components/app-sidebar";
import { NavHeader } from "@/components/header";
import { RegisterForm } from "@/components/register/register-form";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function SignUp() {
    return (
        <SidebarProvider> 
            <AppSidebar />
            <SidebarInset>
                <NavHeader />
                <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4 pt-0">
                    <div className="flex flex-col items-center space-y-15 mb-30">
                        <div className="text-2xl font-extrabold">
                            Pig Pocket
                        </div>
                        <RegisterForm />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
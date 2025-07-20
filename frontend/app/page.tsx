import { AppSidebar } from "@/components/app-sidebar";
import { NavHeader } from "@/components/header";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

export default function Home() {
  return (
    <SidebarProvider> 
      <AppSidebar />
      <NavHeader />
      <div>
        
      </div>
    </SidebarProvider>
  )
}

import { AppSidebar } from "@/components/app-sidebar";
import { NavHeader } from "@/components/header";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider> 
      <AppSidebar />
      <div className="w-full flex flex-col gap-5 px-5">
        <div className='flex justify-between items-center'>
          <NavHeader />
          <Button>
            <a href="/wallet">
              Go to wallet
            </a>
          </Button>
        </div>
        
      </div>
    </SidebarProvider>
  )
}
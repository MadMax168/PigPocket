import { AppSidebar } from '@/components/app-sidebar'
import { NavHeader } from '@/components/header'
import { Button } from '@/components/ui/button'
import { SidebarProvider } from '@/components/ui/sidebar'
import { notFound } from 'next/navigation'

export default function SummaryPage({ params }: { params: { walletName: string } }) {
    const { walletName } = params


    return (
        <SidebarProvider> 
            <AppSidebar />
            <div className="w-full flex flex-col gap-5 px-5">
                <div className='flex justify-between items-center'>
                    <NavHeader />
                    <Button>
                        <a href={`/${walletName}/transaction`}>
                            + Add Transactions
                        </a>
                    </Button>
                </div>
                <div className='grid'>

                </div>
            </div>
        </SidebarProvider>
    )
}
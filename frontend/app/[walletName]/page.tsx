import { AppSidebar } from '@/components/app-sidebar'
import { NavHeader } from '@/components/header'
import { CircularPro } from '@/components/summary/circular'
import { PayList } from '@/components/summary/pay-list'
import { Streak } from '@/components/summary/streak'
import { SummaryCard } from '@/components/summary/summary-list'
import { TransactionSummaryTable } from '@/components/summary/summary-table'
import { Button } from '@/components/ui/button'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function SummaryPage({ params }: { params: { walletName: string } }) {
    const { walletName } = params


    return (
        <SidebarProvider> 
            <AppSidebar />
            <div className="w-full h-screen flex flex-col gap-5 px-5 pb-5">
                <div className='flex justify-between items-center'>
                    <NavHeader />
                    <Button>
                        <a href={`/${walletName}/transaction`}>
                            + Add Transactions
                        </a>
                    </Button>
                </div>
                
                {/* Summary Cards */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                    <SummaryCard title="Income" amount={45678.9} percent={20} />
                    <SummaryCard title="Expense" amount={2405} percent={33} />
                    <SummaryCard title="Balance" amount={10353} percent={-8} />
                </div>

                {/* Grid layout for 2 rows */}
                <div className="w-full h-full grid grid-cols-2 gap-5">
                    {/* Left: Circular + Streak + PayList */}
                    <div className="col-span-1 flex flex-col gap-5">
                        <div className="flex-1 grid grid-cols-2 gap-5">
                        <CircularPro />
                        <Streak />
                        </div>
                        <PayList />
                    </div>
                    
                    {/* Right: Transaction Table */}
                    <TransactionSummaryTable />
                </div>
            </div>
        </SidebarProvider>
    )
}
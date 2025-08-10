import { PayTable } from "@/hooks/useTransaction"
import { PayForm } from "./pl-form"

export function PayList() {
  const { paydata, isLoading } = PayTable()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!paydata || paydata.length === 0) {
    return <div>No pending payments</div>
  }

  return (
    <div className="h-[450px] border rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">To Pay Lists</div>
        <PayForm />
      </div>
      <div className="h-[375px] border rounded-md p-1 overflow-y-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400">
              <th className="p-2"><input type="checkbox" /></th>
              <th className="p-2">Item</th>
              <th className="p-2">Date</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {paydata.map((item: any, index: number) => (
              <tr key={index}>
                <td className="p-2"><input type="checkbox" /></td>
                <td className="p-2">{item.title}</td>
                <td className="p-2">{item.date}</td>
                <td className="p-2">{item.amount}</td>
                <td className="p-2">{item.status ? "Paid" : "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
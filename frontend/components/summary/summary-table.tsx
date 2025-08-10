import { useTransTable } from "@/hooks/useTransaction"

export function TransactionSummaryTable() {
  const { trandata, isLoading } = useTransTable()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!trandata || trandata.length === 0) {
    return <div>No transactions found</div>
  }

  return (
    <div className="rounded-md border p-4 flex-1">
      <div className="text-xl font-bold mb-2">Transaction Summary</div>
      <table className="w-full text-sm text-center">
        <thead className="border-b">
          <tr className="text-center">
            <th className="py-2">Name</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {trandata.map((tx: any) => (
            <tr key={tx.id} className="border-b last:border-none">
              <td className="py-2 font-semibold">{tx.title}</td>
              <td>{tx.type}</td>
              <td>{tx.category}</td>
              <td className={tx.amount < 0 ? 'text-red-600' : 'text-green-600'}>
                {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
              </td>
              <td>{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

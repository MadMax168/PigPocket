type Transaction = {
  id: number
  name: string
  type: 'Income' | 'Expense'
  category: string
  amount: number
  date: string
}

const dummyTransactions: Transaction[] = [
  { id: 1, name: 'A-Company', type: 'Income', category: 'Salary', amount: 100, date: '2025-07-29' },
  { id: 2, name: 'Korean Trip', type: 'Expense', category: 'Travel', amount: -2000, date: '2025-07-28' },
  { id: 3, name: 'A-Company', type: 'Income', category: 'Salary', amount: 100, date: '2025-07-27' },
]

export function TransactionSummaryTable() {
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
          {dummyTransactions.map(tx => (
            <tr key={tx.id} className="border-b last:border-none">
              <td className="py-2 font-semibold">{tx.name}</td>
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
export function SummaryCard({ title, amount, percent }: { title: string, amount: number, percent: number }) {
  const positive = percent >= 0
  return (
    <div className="rounded-md shadow-sm border p-5 space-y-3">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-5xl font-bold">฿{amount.toLocaleString()}</div>
      <div className={`text-sm ${positive ? 'text-green-500' : 'text-red-500'}`}>
        {positive ? '+' : ''}{percent}% month over month
      </div>
    </div>
  )
}
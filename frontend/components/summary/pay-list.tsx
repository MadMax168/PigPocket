import { PayForm } from "./pl-form";

export function PayList() {
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
                    {Array(10).fill(0).map((_, i) => (
                        <tr key={i} className="border-t">
                            <td className="p-2"><input type="checkbox" /></td>
                            <td className="p-2">book</td>
                            <td className="p-2">DD/MM/YY</td>
                            <td className="p-2">- 100</td>
                            <td className="p-2">-</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}
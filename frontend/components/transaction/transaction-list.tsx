"use client";

import { useTransaction } from "@/lib/context/transactionContext";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";

export function TranTable() {
  const {
    savedTransactions,
    submitTransactions,
    deleteTransactions,
    selectTransaction,
    selectedIds,
  } = useTransaction();

  const toggleSelection = (id: string) => {
    selectTransaction(id);
  };

  return (
    <div className="flex-1 border rounded-lg p-5 space-y-4">
      <div className="text-xl font-semibold">Transactions</div>

      <div className="h-[720px] overflow-y-auto border rounded p-2 space-y-2">
        {savedTransactions.length === 0 ? (
          <div className="text-gray-400 italic">No saved transactions.</div>
        ) : (
          savedTransactions.map((txn) => (
            <div
              key={txn.id}
              className={`p-3 border rounded-md cursor-pointer ${
                selectedIds.includes(txn.id)
                  ? "bg-blue-100 border-blue-500"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => toggleSelection(txn.id)}
            >
              <div className="font-medium">{txn.name}</div>
              <div className="text-sm text-gray-600">
                {txn.category} • {txn.type} • {txn.date}
              </div>
              <div className={`text-sm font-semibold ${txn.type === "Expense" ? "text-red-600" : "text-green-600"}`}>
                ฿ {txn.amount}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between gap-4">
        <Button
          onClick={submitTransactions}
          className="flex-1 bg-green-700 text-white"
        >
          <Plus className="mr-2 w-4 h-4" /> Submit
        </Button>
        <Button
          onClick={deleteTransactions}
          className="flex-1 bg-red-600 text-white"
        >
          <Trash2 className="mr-2 w-4 h-4" /> Delete
        </Button>
      </div>
    </div>
  );
}
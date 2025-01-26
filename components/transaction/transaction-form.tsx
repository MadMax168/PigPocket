"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PiggyBank, Trash2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { insertTransactionAction } from "@/app/auth/transactionAction";

// กำหนดประเภทของ TransactionItem props
interface TransactionItemProps {
  index: number;
  deleteTransaction: (index: number) => void;
}

interface Transaction {
  type: string;
  name: string;
  amount: string;
  category: string;
  description: string;
}

function TransactionItems({ index, deleteTransaction }: TransactionItemProps) {
  return (
    <div className="flex gap-1">
      <div className="w-full border rounded-md mb-2">
        <div className="p-2 cursor-pointer flex justify-between items-center">
          <div>Transaction #{index + 1}</div>
        </div>
        <div className="p-2 space-y-2">
          <hr />
          <select name={`transactions[${index}][type]`} required>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <Input
            name={`transactions[${index}][name]`}
            type="text"
            placeholder="Name"
          />
          <Input
            name={`transactions[${index}][amount]`}
            type="number"
            placeholder="Amount"
            required
          />
          <Input
            name={`transactions[${index}][category]`}
            type="text"
            placeholder="Category"
          />
          <Input
            name={`transactions[${index}][desc]`}
            type="text"
            placeholder="Description"
          />
        </div>
      </div>
      <div className="flex justify-end mb-2">
        <Button
          onClick={() => deleteTransaction(index)}
          className="h-full p-2 flex items-center bg-red-500 hover:bg-red-600 text-white"
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}

export function TransactionForms() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { type: "Income", name: "", amount: "", category: "", description: "" },
  ]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [date, setDate] = useState(""); // เก็บวันที่ที่เลือก

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: session } = await supabase.auth.getSession();
      setIsLoggedIn(!!session?.session);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (date) {
      setTransactions([
        { type: "Income", name: "", amount: "", category: "", description: "" },
      ]);
    }
  }, [date]);

  const handleDialogClose = () => setShowDialog(false);

  return (
    <div className="w-full h-full">
      <form
        action={isLoggedIn ? insertTransactionAction : undefined}
        className="w-full h-full flex flex-col gap-2 p-4 border rounded-xl shadow-md"
        onSubmit={(e) => {
          if (!isLoggedIn) {
            e.preventDefault();
            setShowDialog(true);
          }
        }}
      >
        <div className="flex justify-between item-center pb-2 border-b">
          <span className="text-xl flex gap-2">
            <PiggyBank />
            Transactions Form
          </span>
          <Input
            name="date"
            type="date"
            className="w-auto"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="h-full flex flex-col justify-between">
          <div className="h-[600px] p-2 border rounded-lg overflow-y-auto xl:h-[725px]">
            {transactions.map((transaction, index) => (
              <TransactionItems
                key={index}
                index={index}
                deleteTransaction={(i: number) =>
                  setTransactions((prev) => prev.filter((_, idx) => idx !== i))
                }
              />
            ))}
          </div>
          <div className="w-full h-auto flex items-center gap-2">
            <Button
              type="submit"
              className="w-1/2 bg-green-500 hover:bg-green-600"
            >
              SUBMIT
            </Button>
            <Button
              type="button"
              onClick={() =>
                setTransactions((prev) => [
                  ...prev,
                  {
                    type: "Income",
                    name: "",
                    amount: "",
                    category: "",
                    description: "",
                  },
                ])
              }
              className="h-14 w-14 text-black text-xl bg-white flex justify-center items-center border rounded-full hover:bg-black hover:text-white"
            >
              +
            </Button>
            <Button
              type="button"
              className="w-1/2 bg-yellow-500 hover:bg-yellow-600"
              disabled
            >
              EDIT
            </Button>
          </div>
        </div>
      </form>

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md text-center space-y-4">
            <p className="text-lg font-semibold">Please sign in first</p>
            <div className="flex justify-center gap-4">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => (window.location.href = "/signpage")}
              >
                Go to Sign-In
              </Button>
              <Button
                className="bg-gray-500 hover:bg-gray-600 text-white"
                onClick={handleDialogClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

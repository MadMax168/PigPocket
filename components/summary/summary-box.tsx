"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { readTransactionAction } from "@/app/auth/transactionAction";
import { CircularProgress } from "@/components/summary/circular-progress";


interface Transaction {
  date: string;
  type: string;
  name: string;
  amount: number;
  category: string;
  description: string;
}

export function SummaryBox() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("year");
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());

  useEffect(() => {
    async function fetchTransactions() {
      const result = await readTransactionAction();

      if (result.error) {
        setError(typeof result.error === "string" ? result.error : result.error.message);
      } else {
        setTransactions(result.transactions || []);
        setIncome(result.incomeTotal || 0);
        setExpense(result.expenseTotal || 0);
        setTotal(result.totalBalance || 0);
      }
    }

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);

    if (filter === "year") {
      return transactionDate.getFullYear() === selectedYear;
    } else if (filter === "month") {
      return (
        transactionDate.getFullYear() === selectedYear &&
        transactionDate.getMonth() + 1 === selectedMonth
      );
    } else if (filter === "day") {
      return (
        transactionDate.getFullYear() === selectedYear &&
        transactionDate.getMonth() + 1 === selectedMonth &&
        transactionDate.getDate() === selectedDay
      );
    }

    return true;
  });

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="w-full h-full flex border rounded-xl shadow-md p-4">
      <div className="p-4 w-[250px] h-full flex flex-col items-center">
        <div className="w-full mb-4">
          <select
            className="w-full border rounded-md p-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="year">Yearly</option>
            <option value="month">Monthly</option>
            <option value="day">Daily</option>
          </select>
        </div>

        {filter === "year" && (
          <div className="flex items-center gap-2 mb-4">
            <label className="block text-gray-700 font-medium">Year:</label>
            <Input
              type="number"
              className="w-full border rounded-md p-2"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            />
          </div>
        )}

        {filter === "month" && (
          <div className="flex items-center mb-4 gap-1">
            <label className="block text-gray-700 font-medium">Month:</label>
            <Input
              type="month"
              className="w-full border rounded-md p-2"
              value={`${selectedYear}-${selectedMonth.toString().padStart(2, "0")}`}
              onChange={(e) => {
                const [year, month] = e.target.value.split("-");
                setSelectedYear(Number(year));
                setSelectedMonth(Number(month));
              }}
            />
          </div>
        )}

        {filter === "day" && (
          <div className="flex items-center gap-4 mb-4">
            <label className="block text-gray-700 font-medium">Date:</label>
            <Input
              type="date"
              className="w-full border rounded-md p-2"
              value={`${selectedYear}-${selectedMonth.toString().padStart(2, "0")}-${selectedDay
                .toString()
                .padStart(2, "0")}`}
              onChange={(e) => {
                const [year, month, day] = e.target.value.split("-");
                setSelectedYear(Number(year));
                setSelectedMonth(Number(month));
                setSelectedDay(Number(day));
              }}
            />
          </div>
        )}

        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col items-center">
            <div className="mt-2 text-lg text-green-600 font-bold">Income</div>
            <CircularProgress value={income} color="#4CAF50" />
          </div>
          <div className="flex flex-col items-center">
            <div className="mt-2 text-lg text-red-600 font-bold">Expense</div>
            <CircularProgress value={expense} color="#FF5733" />
          </div>
          <div className="flex flex-col items-center">
            <div className="mt-2 text-lg text-blue-600 font-bold">Balance</div>
            <CircularProgress value={total} color="#3b82f6" />
          </div>
        </div>
      </div>

      <div className="p-2 w-full h-[720px] overflow-y-auto border rounded-lg xl:h-[850px]">
        <table className="w-full border-collapse border">
          <thead className="bg-gray-300">
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index}>
                <td className="border p-2 text-center">{transaction.date}</td>
                <td className="border p-2 text-center">{transaction.type}</td>
                <td className="border p-2 text-center">{transaction.name}</td>
                <td className="border p-2 text-center">{transaction.amount}</td>
                <td className="border p-2 text-center">{transaction.category}</td>
                <td className="border p-2 text-center">{transaction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
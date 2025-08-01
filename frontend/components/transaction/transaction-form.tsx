"use client";

import { useTransaction } from "@/lib/context/transactionContext";
import { Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type TransactionType = "Income" | "Expense" | "Save";

export function TranForm() {
  const {
    addTransaction,
    editingTransaction,
    updateTransaction,
    setEditingTransaction,
  } = useTransaction();

  const [form, setForm] = useState({
    name: "",
    category: "",
    amount: "",
    description: "",
    date: "",
    type: "Income",
  });

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        name: editingTransaction.name,
        category: editingTransaction.category,
        amount: editingTransaction.amount.toString(),
        description: editingTransaction.description,
        date: editingTransaction.date,
        type: editingTransaction.type,
      });
    }
  }, [editingTransaction]);

  const clearForm = () => {
    setForm({
      name: "",
      category: "",
      amount: "",
      description: "",
      date: "",
      type: "Income",
    });
    setEditingTransaction(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!form.name || !form.amount || !form.date) return;

  const txn = {
    ...form,
    amount: parseFloat(form.amount),
    type: form.type as TransactionType, // 👈 แปลง type ตรงนี้
  };

  if (editingTransaction) {
    updateTransaction({ ...txn, id: editingTransaction.id });
  } else {
    addTransaction(txn);
  }

  clearForm();
};

  return (
    <div className="flex-1 border rounded-lg p-5">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold">Transaction-Form</div>
          <div className="flex space-x-2">
            <select
              value={form.type}
              onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
              className="border rounded-lg px-2"
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
              <option value="Save">Save</option>
            </select>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
            />
          </div>
        </div>

        <div className="h-[700px] flex flex-col space-y-2 overflow-y-auto px-1">
          <label>Name :</label>
          <Input
            placeholder="Transaction Name"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />

          <label>Category :</label>
          <Input
            placeholder="Food Travel ETC."
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
          />

          <label>Amount :</label>
          <Input
            type="number"
            placeholder="1XX.XX"
            value={form.amount}
            onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
          />

          <label>Description :</label>
          <Textarea
            className="h-full"
            placeholder="Type your description here"
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <div className="w-full flex gap-10">
          <Button type="submit" className="flex-1 bg-green-700 text-white">
            <Check className="mr-2 w-4 h-4" /> Save
          </Button>
          <Button type="button" className="flex-1 bg-red-600 text-white" onClick={clearForm}>
            <X className="mr-2 w-4 h-4" /> Clear
          </Button>
        </div>
      </form>
    </div>
  );
}

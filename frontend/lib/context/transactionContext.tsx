"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

export type TransactionType = "Income" | "Expense" | "Save";

export type Transaction = {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  type: TransactionType;
};

type TransactionContextType = {
  savedTransactions: Transaction[];
  selectedIds: string[];
  editingTransaction: Transaction | null;
  addTransaction: (txn: Omit<Transaction, "id">) => void;
  updateTransaction: (txn: Transaction) => void;
  setEditingTransaction: (txn: Transaction | null) => void;
  selectTransaction: (id: string) => void;
  deleteTransactions: () => void;
  submitTransactions: () => void;
};

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [savedTransactions, setSavedTransactions] = useState<Transaction[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const addTransaction = (txn: Omit<Transaction, "id">) => {
    const newTxn: Transaction = { id: uuidv4(), ...txn };
    setSavedTransactions((prev) => [...prev, newTxn]);
  };

  const updateTransaction = (updated: Transaction) => {
    setSavedTransactions((prev) =>
      prev.map((txn) => (txn.id === updated.id ? updated : txn))
    );
    setEditingTransaction(null);
  };

  const selectTransaction = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    const txn = savedTransactions.find((x) => x.id === id);
    if (txn) setEditingTransaction(txn);
  };

  const deleteTransactions = () => {
    setSavedTransactions((prev) => prev.filter((txn) => !selectedIds.includes(txn.id)));
    setSelectedIds([]);
  };

  const submitTransactions = () => {
    console.log("🚀 Submitted:", savedTransactions);
    // TODO: replace with real API POST call
    setSavedTransactions([]);
    setSelectedIds([]);
  };

  return (
    <TransactionContext.Provider
      value={{
        savedTransactions,
        selectedIds,
        editingTransaction,
        addTransaction,
        updateTransaction,
        setEditingTransaction,
        selectTransaction,
        deleteTransactions,
        submitTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};
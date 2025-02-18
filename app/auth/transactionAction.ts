"use server";

import { createClient } from "@/utils/supabase/server";

// ประกาศ Type สำหรับ Transaction
interface Transaction {
  type: string;
  name: string;
  amount: number;
  category: string;
  description: string;
}

export async function insertTransactionAction(formData: FormData): Promise<{ message: string }> {
  const supabase = await createClient();

  const date = formData.get("date") as string;

  const transactions: Transaction[] = [];
  formData.forEach((value, key) => {
    const match = key.match(/^transactions\[(\d+)\]\[(.+)\]$/);
    if (match) {
      const index = parseInt(match[1], 10);
      const field = match[2];
      transactions[index] = transactions[index] || {};
      (transactions[index] as Transaction)[field] = value; // แทนที่ `any` ด้วย `Transaction`
    }
  });

  console.log("date:", date);
  console.log("transactions:", transactions);

  for (let i = 0; i < transactions.length; i++) {
    const { type, name, amount, category, description } = transactions[i];
    const { data, error } = await supabase.from("transactions").insert([
      {
        date,
        type,
        name,
        amount: parseFloat(amount?.toString() || "0"),
        category,
        description,
      },
    ]);

    if (error) {
      console.error(`Error inserting transaction #${i + 1}:`, error);
      throw error;
    } else {
      console.log(`Transaction #${i + 1} inserted successfully:`, data);
    }
  }

  return { message: "All transactions inserted successfully!" };
}

export async function readTransactionAction(): Promise<{
  status: string;
  message: string;
  transactions?: Transaction[];
  incomeTotal?: number;
  expenseTotal?: number;
  totalBalance?: number;
  error?: string;
}> {
  const supabase = await createClient();

  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("date, type, name, amount, category, description");

  if (error) {
    console.error("Error fetching transactions:", error.message);
    return {
      status: "error",
      message: "Failed to fetch transactions.",
      error: error.message,
    };
  }

  if (!transactions || !Array.isArray(transactions)) {
    return {
      status: "error",
      message: "Failed to fetch transactions.",
      error: "Invalid data format.",
    };
  }

  let incomeTotal = 0;
  let expenseTotal = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "Income") {
      incomeTotal += transaction.amount || 0;
    } else if (transaction.type === "Expense") {
      expenseTotal += transaction.amount || 0;
    }
  });

  const totalBalance = incomeTotal - expenseTotal;

  return {
    status: "success",
    message: "Transactions fetched successfully.",
    transactions,
    incomeTotal,
    expenseTotal,
    totalBalance,
  };
}
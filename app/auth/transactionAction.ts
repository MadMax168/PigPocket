"use server";

import { createClient } from "@/utils/supabase/server";

export async function insertTransactionAction(formData: FormData) {
  const supabase = await createClient();

  const date = formData.get("date");

  const transactions: any[] = [];
  formData.forEach((value, key) => {
    const match = key.match(/^transactions\[(\d+)\]\[(.+)\]$/);
    if (match) {
      const index = parseInt(match[1], 10);
      const field = match[2];
      transactions[index] = transactions[index] || {};
      transactions[index][field] = value;
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
        amount: parseFloat(amount || "0"),
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
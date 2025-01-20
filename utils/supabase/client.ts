import { createBrowserClient } from "@supabase/ssr";

export const createClient = (cookieStore: unknown) =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
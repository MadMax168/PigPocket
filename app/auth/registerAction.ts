"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const name = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    const origin = (await headers()).get("origin");
    const supabase = await createClient();
  
    if (!email || !password) {
      return encodedRedirect("error", "/signpage", "Email and password are required");
    }
  
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: { display_name: name },
      },
    });
  
    return error
      ? encodedRedirect("error", "/signpage", error.message)
      : encodedRedirect(
          "success",
          "/#",
          "Thanks for signing up! Please check your email for a verification link."
        );
};

export const signInAction = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const supabase = await createClient();
  
    if (!email || !password) {
      return encodedRedirect("error", "/signpage", "Email and password are required");
    }
  
    const { error } = await supabase.auth.signInWithPassword({ email, password });
  
    return error
      ? encodedRedirect("error", "/signpage", error.message)
      : redirect("/#");
};

export const signOutAction = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/#");
};
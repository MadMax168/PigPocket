"use client"

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { signup } from "@/lib/api/authApi";

export function RegisterForm() {
    const router = useRouter()

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault
        if ( form.password !== form.confirmPassword ) {
            alert("Passwords do not match")
            return
        }

        try {
            await signup(form)
            router.push("/login")
        } catch(err) {
            alert("Sign-up failed")
            console.error(err)
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col space-y-5">
                <div className="text-center">
                    <div className="text-xl font-bold">
                        Create an account
                    </div>
                    <div className="font-semibold">
                        Fill your information to sign-up for this app
                    </div>
                </div>
                <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
                    <Input 
                        type="username"
                        name="username"
                        placeholder="username"
                        value={form.username}
                        onChange={handleChange}
                    />
                    <Input 
                        type="email" 
                        name="email"
                        placeholder="pig@mail.com"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <Input 
                        type="password" 
                        name="password"
                        placeholder="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <Input 
                        type="con-password" 
                        name="confirmPassword"
                        placeholder="confirmed-password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                    <Button type="submit">
                        Sign-Up
                    </Button>
                </form>
            </div>
            <a href="/login" className="text-sm text-right text-red-500 underline">
                sign-in?
            </a>
        </div>
    )
}
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { signin } from "@/lib/api/authApi"

export function SignForm() {
    const router = useRouter()
    const [form, setForm] = useState({ name: "", password: "" })
    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
        const res = await signin(form)
        localStorage.setItem("token", res.token) // หรือ res.data.token
        router.push("/wallet") // ไปหน้าแอปหลัก
        } catch (err: any) {
        setError(err.response?.data?.message || "Login failed")
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col space-y-5">
                <div className="text-center">
                    <div className="text-xl font-bold">
                        Log-in an account
                    </div>
                    <div className="font-semibold">
                        Fill your information to sign-in for this app
                    </div>
                </div>
                <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
                    <Input 
                        type="username" 
                        name="name"
                        placeholder="username"
                        onChange={handleChange}
                    />
                    <Input 
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={handleChange}
                    />
                    <Button type="submit">
                        Sign-In
                    </Button>
                </form>
            </div>
            <a href="/register" className="text-sm text-right text-red-500 underline">
                sign-up?
            </a>
        </div>
    )
}
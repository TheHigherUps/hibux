"use client"
import { Database } from "@/types_db"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Index() {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()
    const [form, setForm] = useState({ email: "", password: "" })
    const [message, setMessage] = useState("")

    async function createAccount(e: React.FormEvent<EventTarget>) {
        e.preventDefault()
        const { error } = await supabase.auth.signUp({
            email: form.email,
            password: form.password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
                data: {
                    first_name: "Tim",
                    verified: true,
                },
            },
        })
        router.refresh()
        if (error) {
            console.log(error)
        } else {
            setMessage("Account Created! Check email for further intructions")
        }
    }
    return (
        <div className="m-24 flex flex-col gap-10 items-center">
            <h1 className="text-4xl">Create a HiBlox Account</h1>
            <form onSubmit={createAccount} className="flex flex-col gap-5 ">
                <input
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                    className="px-5 py-4 text-2xl"
                />
                <input
                    value={form.password}
                    onChange={(e) => {
                        setForm({ ...form, password: e.target.value })
                    }}
                    className="px-5 py-4 text-2xl"
                />
                <button
                    type="submit"
                    className="text-2xl bg-green-400 rounded-md"
                >
                    Create Account
                </button>
                <p className="text-neutral-500 text-center">
                    Already have an account?{" "}
                    <Link
                        href="/account/sign-in"
                        className="underline hover:text-white transition"
                    >
                        Sign in now!
                    </Link>
                </p>
                <p>{message}</p>
            </form>
        </div>
    )
}

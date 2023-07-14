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
    const [loading, setLoading] = useState(false)

    async function createAccount(e: React.FormEvent<EventTarget>) {
        e.preventDefault()
        try {
            setLoading(true)
            const { error } = await supabase.auth.signInWithPassword({
                email: form.email,
                password: form.password,
            })
            router.refresh()
            if (error) {
                setMessage(error.message)
            } else {
                setMessage("Success!")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="m-24 flex flex-col gap-10 items-center">
            <h1 className="text-4xl">Log in to your HiBlox Account</h1>
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
                    disabled={loading}
                    type="submit"
                    className="text-2xl bg-green-400 rounded-md disabled:bg-green-400/40 disabled:text-neutral-400"
                >
                    Log in
                </button>
                <p className="text-neutral-500 text-center">
                    Don't have an account?{" "}
                    <Link
                        href="/account/sign-up"
                        className="underline hover:text-white transition"
                    >
                        Create one now!
                    </Link>
                </p>
                <p>{message}</p>
            </form>
        </div>
    )
}

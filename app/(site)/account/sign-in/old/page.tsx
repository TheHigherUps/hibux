"use client"
import Button from "@/components/Button"
import { Database } from "@/types_db"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import logo from "@/public/images/logo.png"
import Image from "next/image"

export default function Index() {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()
    const [form, setForm] = useState({ email: "", password: "" })
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    // async function createAccount(e: React.FormEvent<EventTarget>) {
    //     e.preventDefault()
    //     try {
    //         setLoading(true)
    //         const { error } = await supabase.auth.signInWithPassword({
    //             email: form.email,
    //             password: form.password,
    //         })
    //         if (error?.message === "Email not confirmed") {
    //             const { error: resendEmail } = await supabase.auth.resend({
    //                 type: "signup",
    //                 email: form.email,
    //                 options: {
    //                     emailRedirectTo: `${location.origin}/auth/callback`,
    //                 },
    //             })
    //             setMessage(
    //                 "Email not confirmed. Check email for more information"
    //             )
    //             return
    //         }
    //         if (error) {
    //             setMessage(error.message)
    //         } else {
    //             setMessage("Success!")
    //             router.refresh()
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }
    return (
        <div className="m-24 flex flex-col gap-10 items-center">
            <Image
                src={logo}
                alt=""
                className="aspect-auto h-12 object-contain"
            />
            <h1 className="text-4xl">Sign in to your account</h1>
            <form onSubmit={createAccount} className="flex flex-col gap-5 ">
                <input
                    placeholder="Enter Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                    className="px-5 py-4 text-2xl rounded-lg"
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={form.password}
                    onChange={(e) => {
                        setForm({ ...form, password: e.target.value })
                    }}
                    className="px-5 py-4 text-2xl rounded-lg"
                />
                <Button
                    type="submit"
                    className="text-2xl"
                    disabled={loading}
                    loading={loading}
                >
                    Sign in
                </Button>
                {/* <button
                    disabled={loading}
                    type="submit"
                    className="text-2xl bg-green-400 rounded-lg disabled:bg-green-400/40 disabled:text-neutral-400"
                >
                    Log in
                </button> */}
                <p className="text-neutral-500 text-center">
                    Don&apos;t have an account?{" "}
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

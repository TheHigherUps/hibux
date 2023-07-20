"use client"
import Button from "@/components/Button"
import { Database } from "@/types_db"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import logo from "@/public/images/logo.png"
import Image from "next/image"

export default function Index() {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()
    const messageRef = useRef<HTMLParagraphElement>(null)
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
    })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        setTimeout(() => {
            setMessage("")
        }, 4500)
        console.log("p")
    }, [message])

    async function createAccount(e: React.FormEvent<EventTarget>) {
        e.preventDefault()
        if (form.password !== form.passwordConfirm) {
            setMessage("Passwords do not match")
            messageRef.current?.scrollIntoView({ behavior: "smooth" })
            return
        }
        try {
            setLoading(true)
            const { error } = await supabase.auth.signUp({
                email: form.email,
                password: form.password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`,
                    data: {
                        username: form.username,
                        // verified: true,
                    },
                },
            })
            router.refresh()
            if (error) {
                console.log(error)
                setMessage(error.message)
            } else {
                setMessage(
                    "Account Created! Check email for further intructions"
                )
            }
            messageRef.current?.scrollIntoView({ behavior: "smooth" })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="m-24 flex flex-col gap-10 items-center">
            <Image
                src={logo}
                alt=""
                className="aspect-auto object-contain h-12"
            />
            <h1 className="text-4xl">Create your account</h1>
            <form onSubmit={createAccount} className="flex flex-col gap-5 ">
                <input
                    placeholder="Enter @username"
                    value={form.username}
                    onChange={(e) => {
                        setForm({ ...form, username: e.target.value })
                    }}
                    className="px-5 py-4 text-2xl rounded-lg"
                />
                <input
                    placeholder="Enter Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                    className="px-5 py-4 text-2xl rounded-lg"
                />
                <input
                    placeholder="Enter Password"
                    value={form.password}
                    onChange={(e) => {
                        setForm({ ...form, password: e.target.value })
                    }}
                    className="px-5 py-4 text-2xl rounded-lg"
                />
                <input
                    placeholder="Confirm Password"
                    value={form.passwordConfirm}
                    onChange={(e) => {
                        setForm({ ...form, passwordConfirm: e.target.value })
                    }}
                    className="px-5 py-4 text-2xl rounded-lg"
                />
                <Button
                    loading={loading}
                    disabled={loading || form.password !== form.passwordConfirm}
                    className="text-2xl"
                >
                    Create Account
                </Button>
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
            </form>
            <div className="w-full max-w-full">
                <p ref={messageRef} className="break-all">
                    {message}
                </p>
            </div>
        </div>
    )
}

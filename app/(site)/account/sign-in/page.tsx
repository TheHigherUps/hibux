"use client"
import Button from "@/components/Button"
import { Database } from "@/types_db"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import logo from "@/public/images/logo.png"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { zodResolver } from "@hookform/resolvers/zod"
import toast, { Toaster } from "react-hot-toast"

const Schema = z.object({
    email: z.string().nonempty("Email is required").email("Email is not valid"),
    password: z.string().nonempty("Password is required"),
})

type FormInput = z.infer<typeof Schema>

export default function Index() {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()
    const form = useForm<FormInput>({ resolver: zodResolver(Schema) })
    const { register, handleSubmit, formState } = form
    const errors = formState.errors
    // const [form, setForm] = useState({ email: "", password: "" })
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleLogin(data: FormInput) {
        try {
            setLoading(true)
            const { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            })
            if (error?.message === "Email not confirmed") {
                const { error: resendEmail } = await supabase.auth.resend({
                    type: "signup",
                    email: data.email,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                    },
                })
                toast("Email not confirmed, Check email for more information", {
                    icon: <AiOutlineInfoCircle size={32} color="blue" />,
                })
                setMessage(
                    "Email not confirmed. Check email for more information"
                )
                return
            }
            if (error) {
                toast.error(`Error signing into account: ${error.message}`)
                setMessage(error.message)
            } else {
                toast.success("Success! Signing in now!")
                setMessage("Success!")
                router.refresh()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="m-24 flex flex-col gap-10 items-center">
            <Toaster />
            <Image
                src={logo}
                alt=""
                className="aspect-auto h-12 object-contain"
            />
            <h1 className="text-4xl">Sign in to your account</h1>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="flex flex-col gap-5 "
            >
                <div>
                    <input
                        placeholder="Enter Email"
                        {...register("email")}
                        // value={form.email}
                        // onChange={(e) =>
                        //     setForm({ ...form, email: e.target.value })
                        // }
                        className="px-5 py-4 text-2xl rounded-lg"
                    />
                    <p className="text-red-400 pl-1 pt-1">
                        {errors.email?.message}
                    </p>
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        {...register("password")}
                        // value={form.password}
                        // onChange={(e) => {
                        //     setForm({ ...form, password: e.target.value })
                        // }}
                        className="px-5 py-4 text-2xl rounded-lg"
                    />
                    <p className="text-red-400 pl-1 pt-1">
                        {errors.password?.message}
                    </p>
                </div>
                <Button
                    type="submit"
                    className="text-2xl w-[75%] self-center"
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
            </form>
        </div>
    )
}

"use client"
import Button from "@/components/Button"
import { Database } from "@/types_db"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import logo from "@/public/images/logo.png"
import Image from "next/image"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const Schema = z
    .object({
        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(20, "Username cannot be longer than 20 characters")
            .nonempty("Username is required"),
        email: z
            .string()
            .nonempty("Email is required")
            .email("Email is not valid"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .nonempty("Password is required"),
        passwordConfirm: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .nonempty("Password conformation is required"),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords don't match",
        path: ["passwordConfirm"],
    })

type FormInput = z.infer<typeof Schema>

export default function Index() {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()
    const messageRef = useRef<HTMLParagraphElement>(null)
    const form = useForm<FormInput>({ resolver: zodResolver(Schema) })
    const { register, control, handleSubmit, formState } = form
    const { errors } = formState
    // const [form, setForm] = useState({
    //     username: "",
    //     email: "",
    //     password: "",
    //     passwordConfirm: "",
    // })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        setTimeout(() => {
            setMessage("")
        }, 4500)
        console.log("p")
    }, [message])

    // async function createAccount(data: FormInput) {
    //     try {
    //         setLoading(true)
    //         const { error } = await supabase.auth.signUp({
    //             email: data.email,
    //             password: data.password,
    //             options: {
    //                 emailRedirectTo: `${location.origin}/auth/callback`,
    //                 data: {
    //                     username: data.username,
    //                     // verified: true,
    //                 },
    //             },
    //         })
    //         router.refresh()
    //         if (error) {
    //             console.log(error)
    //             setMessage(error.message)
    //         } else {
    //             setMessage(
    //                 "Account Created! Check email for further intructions"
    //             )
    //         }
    //         messageRef.current?.scrollIntoView({ behavior: "smooth" })
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
                className="aspect-auto object-contain h-12"
            />
            <h1 className="text-4xl">Create your account</h1>
            <form className="flex flex-col gap-5 ">
                <input
                    placeholder="Enter @username"
                    {...register("username")}
                    className="px-5 py-4 text-2xl rounded-lg"
                />
                <p className="text-red-400">{errors.username?.message}</p>
                <input
                    placeholder="Enter Email"
                    {...register("email")}
                    className="px-5 py-4 text-2xl rounded-lg"
                />
                <p className="text-red-400">{errors.email?.message}</p>
                <input
                    type="password"
                    placeholder="Enter Password"
                    {...register("password")}
                    className="px-5 py-4 text-2xl rounded-lg"
                />
                <p className="text-red-400">{errors.password?.message}</p>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register("passwordConfirm")}
                    className="px-5 py-4 text-2xl rounded-lg"
                />
                <p className="text-red-400">
                    {errors.passwordConfirm?.message}
                </p>
                <Button
                    loading={loading}
                    disabled={loading}
                    className="text-2xl"
                >
                    Create Account
                </Button>
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

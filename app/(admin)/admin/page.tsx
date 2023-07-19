"use client"

import { Database } from "@/types_db"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { User, createClient } from "@supabase/supabase-js"
import { useState } from "react"

export default function Index() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
        // {
        //     // auth: {
        //     //     autoRefreshToken: false,
        //     //     persistSession: true,
        //     // },
        // }
    )
    const admin = supabase.auth.admin

    async function listUsers() {
        admin.updateUserById("0835bf58-215b-404a-a8b4-682a268beebd", {
            user_metadata: { first_name: "TheHigherUps", verified: true },
        })
    }
    return (
        <div className="flex flex-col ">
            <button onClick={listUsers}>List users</button>
        </div>
    )
}

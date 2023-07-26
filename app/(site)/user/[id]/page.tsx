import { Database } from "@/types_db"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function Index({ params }: { params: { id: string } }) {
    const supabase = createServerComponentClient<Database>({ cookies })
    const { data: user, error } = await supabase
        .from("profiles")
        .select()
        .eq("user_id", params.id)

    return <pre>{JSON.stringify(user, null, 2)}</pre>
}

import { Database } from "@/types_db"
import {
    createClientComponentClient,
    createServerComponentClient,
} from "@supabase/auth-helpers-nextjs"
import { headers, cookies } from "next/headers"

export const supabase = createClientComponentClient<Database>()

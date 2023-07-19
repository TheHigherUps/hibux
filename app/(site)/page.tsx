"use client"
import CreationCard from "@/components/CreationCard"
import { Database } from "@/types_db"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"

type Game = Database["public"]["Tables"]["games"]["Row"]
export default function Home() {
    const supabase = createClientComponentClient<Database>()
    const [games, setGames] = useState<Game[] | null>(null)
    useEffect(() => {
        const getGames = async () => {
            const { data: games } = await supabase.from("games").select()
            setGames(games)
        }
        getGames()
    }, [supabase])
    console.log(games)
    return (
        <div className="m-24">
            <h1 className="text-center text-4xl">
                Discover Amazing HiBlox Creations
            </h1>
            <div className="flex flex-wrap justify-center flex-row gap-5 py-5">
                {games?.map((item) => {
                    return <CreationCard key={item.id} {...item} />
                })}
            </div>
        </div>
    )
}

import { Database } from "@/types_db"
import {
    createClientComponentClient,
    createServerComponentClient,
} from "@supabase/auth-helpers-nextjs"
import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import Image from "next/image"
import { twMerge } from "tailwind-merge"
import fallbackImage from "@/public/default.jpg"
// import { supabase } from "@/utils/supabase"

// type Game = Database["public"]["Tables"]["games"]["Row"]
export const revalidate = 0

// export async function generateStaticParams() {
//     const supabase = createServerComponentClient<Database>({ cookies })
//     const { data: games } = await supabase.from("games").select("id")

//     return games?.map(({ id }) => ({
//         id,
//     }))
// }

export default async function Index({ params }: { params: { id: string } }) {
    const supabase = createServerComponentClient<Database>({ cookies })
    const { data: game } = await supabase
        .from("games")
        .select()
        .eq("id", params.id)
        .single()
    const { data: lowResImage } = supabase.storage
        .from("games-images")
        .getPublicUrl(`game_${game?.id}`, {
            transform: {
                width: 20,
                height: 20,
            },
        })
    if (!game) {
        notFound()
    }
    return (
        <div className="m-64">
            <div className="flex flex-row gap-10">
                <div
                    className={twMerge(
                        "relative w-[550px] h-[400px] after:absolute after:bg-white/10 after:inset-0 after:rounded-xl after:animate-pulse ",
                        game.id && "after:animate-none after:bg-transparent"
                    )}
                >
                    <Image
                        src={game.image}
                        alt="Games Image"
                        placeholder="blur"
                        blurDataURL="/default.jpg"
                        fill
                        className="rounded-xl object-cover"
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl">{game.name}</h1>
                        <p className="text-neutral-400">{game.description}</p>
                        game id: {params.id} {JSON.stringify(game?.name)}
                    </div>
                    <button className="bg-green-400 w-full rounded-md text-xl mt-5 text-center">
                        Play Game
                    </button>
                </div>
            </div>
            {JSON.stringify(game, null, 2)}
        </div>
    )
}

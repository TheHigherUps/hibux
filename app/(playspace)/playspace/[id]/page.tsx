"use client"

import { Transition } from "@headlessui/react"
import { useEffect, useState } from "react"
import { VscLoading } from "react-icons/vsc"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { twMerge } from "tailwind-merge"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types_db"

type Game = Database["public"]["Tables"]["games"]["Row"]

export default function Index({ params }: { params: { id: string } }) {
    const supabase = createClientComponentClient<Database>()
    const [loading, setLoading] = useState(true)
    const [gameData, setGameData] = useState<Game | null>(null)
    useEffect(() => {
        if (gameData) {
            setTimeout(() => {
                setLoading(false)
            }, 2500)
        } else {
            console.log("no date")
        }
    }, [gameData])
    useEffect(() => {
        const getGame = async () => {
            const { data: games, error } = await supabase
                .from("games")
                .select()
                .eq("id", params.id)
                .single()
            if (error) {
                console.log(error)
            } else {
                setGameData(games)
            }
        }
        getGame()
    }, [supabase])
    return (
        <div>
            <Transition
                show={loading}
                className="fixed top-0 left-0 w-full h-full bg-slate-500 grid place-items-center overflow-hidden"
                enter="transition-opacity duration-75 "
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-all duration-1000"
                leaveFrom="h-[200]"
                leaveTo="h-0"
            >
                {loading ? (
                    <div className="flex flex-col items-center gap-5">
                        <VscLoading
                            size={64}
                            className="animate-spin self-center"
                        />
                        <p>Loading experince data</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-5">
                        <AiOutlineCheckCircle
                            size={64}
                            className=" self-center"
                        />
                        <p>Finished Loading</p>
                    </div>
                )}
            </Transition>
            <div className="m-24 text-center">
                <h1>You have loaded into PlaySpace:</h1>
                <pre>
                    {params.id} || {gameData?.name}
                </pre>
                {JSON.stringify(gameData, null, 2)}
            </div>
        </div>
    )
}

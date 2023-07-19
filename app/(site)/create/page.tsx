"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState, useId, ChangeEvent } from "react"

import { Database } from "@/types_db"

type Game = Database["public"]["Tables"]["games"]["Row"]

export default function Index() {
    const supabase = createClientComponentClient<Database>()
    const [gameUrl, setGameUrl] = useState<Game["image"]>("")
    const [uploading, setUploading] = useState(false)
    const [createForm, setCreateForm] = useState({
        name: "",
        description: "",
        creator: "",
        image: "http://localhost:54321/storage/v1/object/public/games_images/d66ae37d46e00a1ecacfe9531986690a.jpg",
    })

    async function createPlayspace() {
        try {
            setUploading(true)
            const { error } = await supabase.from("games").insert({
                created_by: createForm.creator,
                description: createForm.description,
                name: createForm.name,
            })
        } catch (e) {
            alert("Error creating PlaySpace")
        } finally {
            setUploading(false)
        }
        //
    }
    return (
        <>
            <div>
                NOT A SECURE CONNECTION TO THE HIGHER UPS SERVER; UNABLE TO LOAD
                PLAYSPACE CREATOR; ERROR CODE 4
            </div>
            <div className="m-24  flex flex-col gap-10 items-center">
                <h1 className="text-4xl text-center">
                    Create an expierience for all to see
                </h1>
                <form
                    onSubmit={createPlayspace}
                    className="w-[500px] bg-slate-500 rounded-lg"
                >
                    <h2 className="text-3xl text-center py-5 ">
                        Create an Awesome Expierence
                    </h2>
                    <div className="flex flex-col gap-5 px-3 py-5">
                        <input
                            value={createForm.name}
                            onChange={(e) => {
                                setCreateForm({
                                    ...createForm,
                                    name: e.target.value,
                                })
                            }}
                            type="text"
                            className="px-4 py-2 text-xl rounded-md"
                            placeholder="Expierence Name"
                        />
                        <input
                            value={createForm.description}
                            onChange={(e) => {
                                setCreateForm({
                                    ...createForm,
                                    description: e.target.value,
                                })
                            }}
                            type="text"
                            className="px-4 py-2 text-xl rounded-md"
                            placeholder="Expierence Description"
                        />
                        <input
                            value={createForm.creator}
                            onChange={(e) => {
                                setCreateForm({
                                    ...createForm,
                                    creator: e.target.value,
                                })
                            }}
                            type="text"
                            className="px-4 py-2 text-xl rounded-md"
                            placeholder="Expierence Creator"
                        />
                        {/* <p>Expierence Image</p>
                        <input
                            onChange={handleImageChange}
                            type="file"
                            className="px-4 py-2 text-xl rounded-md "
                            // placeholder="asd"
                        /> */}
                        <button
                            type="submit"
                            className="w-full bg-green-500 px-4 py-2 rounded-md disabled:bg-green-500/60 disabled:text-neutral-300"
                            disabled={uploading}
                        >
                            Create Expierence
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

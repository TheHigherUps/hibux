"use client"
import Image from "next/image"

interface CreationCardProps {
    id: string | null
    created_at: string | null
    created_by: string | null
    name: string | null
    description: string | null
    image: string | null
}

const CreationCard: React.FC<CreationCardProps> = ({
    id,
    created_at,
    created_by,
    name,
    description,
    image,
}) => {
    return (
        <div className="h-72 w-96 rounded-md bg-slate-500 drop-shadow-2xl">
            <div className="relative w-full h-1/2 bg-black">
                <Image className="" fill src={image!} alt={"Tolve"} />
                ths would be an image
            </div>
            <div className="px-3 py-2">
                <p className="text-2xl">{name || "name"}</p>
                <p className=" truncate">
                    {description || <i>No description provided</i>}
                </p>
                <button className="bg-green-400 w-full rounded-md text-xl mt-5">
                    Play Now
                </button>
            </div>
        </div>
    )
}

export default CreationCard

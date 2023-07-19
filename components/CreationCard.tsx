"use client"
import Image from "next/image"
import Link from "next/link"
import Button from "./Button"

interface CreationCardProps {
    id: number | null
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
            <div className="relative w-full h-1/2 bg-black rounded-t-md">
                <Image
                    className="rounded-t-md"
                    fill
                    src={image!}
                    alt={"Tolve"}
                />
                ths would be an image
            </div>
            <div className="px-3 py-2 flex flex-col justify-between h-1/2 ">
                <p className="text-2xl">{name || "name"}</p>
                <p className="line-clamp-2 text-ellipsis">
                    {description || <i>No description provided</i>}
                </p>
                <Link
                    href={`${location.origin}/game/${id}`}
                    className="bg-green-400 w-full rounded-md text-xl justify-self-end self-end"
                >
                    <Button size="sm" className="w-full">
                        Play Now
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default CreationCard

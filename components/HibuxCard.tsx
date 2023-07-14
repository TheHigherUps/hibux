"use client"
import { twMerge } from "tailwind-merge"
interface HibuxCardProps {
    name: string
    description: string
    price: number
    quantity?: number
    onSale?: boolean
    featured?: boolean
}

const HibuxCard: React.FC<HibuxCardProps> = ({
    name,
    description,
    price,
    quantity,
    onSale,
    featured,
}) => {
    return (
        <div
            className={twMerge(
                "flex flex-col gap-10 items-center bg-slate-500/80 w-56 rounded-xl px-5 py-2",
                featured && "scale-110"
            )}
        >
            {featured ? (
                <div className="w-full bg-yellow-300 text-black text-center rounded-full">
                    FEATURED PACKAGE
                </div>
            ) : null}
            <h1 className="text-center">{name}</h1>
            <p>{description}</p>
            <div className="bg-red-200 w-[150px] h-[150px] text-black">
                img(comingsoon)
            </div>
            <p>${price}</p>
            <button className="bg-green-500 px-5 py-2 rounded-full">
                Buy Now
            </button>
        </div>
    )
}

export default HibuxCard

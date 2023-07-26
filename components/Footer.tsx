"use client"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="w-full bg-gray-800 px-4 py-2  flex flex-col gap-2 lg:flex-row lg:justify-around lg:gap-0">
            <div>
                <p className="text-xl">2023 - The Hitorium Project</p>
                <p className="text-xs text-white/50 text-end">
                    A project of TheHigherUps
                </p>
            </div>
            <div className="flex gap-2">
                <Link href="/" className="underline">
                    Terms
                </Link>
                <Link href="/" className="underline">
                    Terms
                </Link>
                <Link href="/" className="underline">
                    Terms
                </Link>
                <Link href="/" className="underline">
                    Terms
                </Link>
            </div>
            <div className="w-1/4">
                <p>
                    Hitorium has no affiliation with Roblox or the Roblox
                    Corporation
                </p>
            </div>
            {/* <p>&copy; 2022 - The Hitorium Project</p> */}
            {/* <div className="flex justify-between">
                <p className="text-white/50">
                    A product of{" "}
                    <Link
                        href="https://www.thehigherups.org"
                        className="hover:text-white hover:underline transition-all"
                    >
                        TheHigherUps
                    </Link>
                </p>
                <p>
                    Hitorium is not affilated with Roblox or the Roblox
                    Corporation
                </p>
            </div> */}
        </footer>
    )
}

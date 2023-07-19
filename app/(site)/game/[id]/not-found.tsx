"use client"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="m-24 text-center flex flex-col gap-10">
            <h1>Game could not be found</h1>
            <Link href="/" className="underline">
                Return Home
            </Link>
        </div>
    )
}

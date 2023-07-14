"use client"
import { useEffect, useMemo } from "react"
import { usePathname, useRouter } from "next/navigation"
import HeaderLink from "./HeaderLink"
import {
    User,
    createClientComponentClient,
} from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types_db"
import Link from "next/link"

interface HeaderProps {
    children: React.ReactNode
    user: User | null
}

const Header: React.FC<HeaderProps> = ({ user, children }) => {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()
    const pathname = usePathname()
    const routes = useMemo(
        () => [
            {
                label: "Discover",
                href: "/",
                active: pathname === "/discover",
            },
            {
                label: "Marketplace",
                href: "/marketplace",
                active: pathname === "/marketplace",
            },
            {
                label: "Create",
                href: "/create",
                active: pathname === "/create",
            },
            {
                label: "HiBux",
                href: "/hibux",
                active: pathname === "/hibux",
            },
        ],
        [pathname]
    )
    async function signOut() {
        const { error } = await supabase.auth.signOut()
        router.refresh()
    }
    return (
        <div className="h-full flex flex-col">
            <header className=" w-full bg-gray-800 flex items-center px-4 py-3 justify-between">
                <div className="flex items-center gap-16">
                    <h1 className="text-2xl">HiBlox</h1>

                    <div className="flex gap-16">
                        {routes.map((item) => {
                            return <HeaderLink key={item.label} {...item} />
                        })}
                    </div>
                </div>
                {user ? (
                    <button onClick={signOut}>Sign out</button>
                ) : (
                    <div className="flex gap-2">
                        <Link
                            href="/account/sign-in"
                            className="bg-neutral-200  p-2 rounded-xl text-neutral-800"
                        >
                            Sign in
                        </Link>
                        <Link
                            href="/account/sign-up"
                            className="bg-green-400 p-2 rounded-xl text-neutral-100"
                        >
                            Sign up
                        </Link>
                    </div>
                )}
            </header>
            <main className="flex-1 h-full overflow-y-auto bg-gray-700">
                {children}
            </main>
        </div>
    )
}

export default Header

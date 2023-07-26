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
import { GoVerified } from "react-icons/go"
import Button from "./Button"
import logo from "@/public/images/logo.png"
import Image from "next/image"
import Footer from "./Footer"

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
    const userRoutes = useMemo(
        () => [
            {
                label: "Profile",
                href: "/profile",
                active: pathname === "/profile",
            },
            {
                label: "Character",
                href: "/character",
                active: pathname === "/character",
            },
            {
                label: "Friends",
                href: "/friends",
                active: pathname === "/friends",
            },
            {
                label: "Account",
                href: "/account",
                active: pathname === "/account",
            },
            {
                label: "Invites",
                href: "/invites",
                active: pathname === "/invites",
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
            <header className=" w-full h-16 bg-gray-800 flex items-center px-4 py-3 justify-between">
                <div className="flex items-center gap-16">
                    <Link href="/">
                        <Image
                            src={logo}
                            alt=""
                            className=" aspect-auto h-full w-32 object-cover"
                        />
                    </Link>
                    {/* <h1 className="text-2xl">HiBlox</h1> */}
                    <div className="flex gap-16">
                        {routes.map((item) => {
                            return <HeaderLink key={item.label} {...item} />
                        })}
                    </div>
                </div>
                {user ? (
                    <div className="flex flex-row gap-5">
                        <div className="flex items-center gap-1">
                            <p>Welcome, {user.user_metadata.username || ""}</p>
                            {user.user_metadata.verified ? (
                                <GoVerified
                                    size={24}
                                    style={{ color: "lightblue" }}
                                />
                            ) : null}
                        </div>
                        <button onClick={signOut}>Sign out</button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link href="/account/sign-in">
                            <Button variant="secondary">Sign in</Button>
                        </Link>
                        <Link href="/account/sign-up">
                            <Button>Sign up</Button>
                        </Link>
                        {/* <Link
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
                        </Link> */}
                    </div>
                )}
            </header>
            {user ? (
                <header className="w-full h-12 bg-gray-950 px-4 flex flex-row  items-center">
                    <div className="flex gap-8">
                        {userRoutes.map((item) => {
                            return <HeaderLink key={item.label} {...item} />
                        })}
                    </div>
                </header>
            ) : null}
            <main className="flex-1 flex flex-col justify-between h-full overflow-y-auto bg-gray-700">
                {children}
                <Footer />
            </main>
        </div>
    )
}

export default Header

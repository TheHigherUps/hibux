import { Database } from "@/types_db"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import { CgProfile } from "react-icons/cg"
import {
    MdSecurity,
    MdOutlinePrivacyTip,
    MdNotifications,
    MdPayments,
    MdOutlineContactSupport,
    MdDelete,
} from "react-icons/md"
import { useMemo } from "react"
import { usePathname } from "next/navigation"
export default async function Index() {
    const supabase = createServerComponentClient<Database>({ cookies })
    const {
        data: { user },
    } = await supabase.auth.getUser()
    const username = user?.user_metadata.username
    const routesOld = [
        "Profile",
        "Security",
        "Privacy",
        "Notifications",
        "Payments",
        "Support",
        "Delete Account",
    ]
    const routes = [
        {
            label: "Profile",
            icon: CgProfile,
            href: "/account",
        },
        {
            label: "Security",
            icon: MdSecurity,
            href: "/account/security",
        },
        {
            label: "Privacy",
            icon: MdOutlinePrivacyTip,
            href: "/account/privacy",
        },
        {
            label: "Notifications",
            icon: MdNotifications,
            href: "/account/notifications",
        },
        {
            label: "Purchases",
            icon: MdPayments,
            href: "/account/payments",
        },
        {
            label: "Support",
            icon: MdOutlineContactSupport,
            href: "/account/support",
        },
        {
            label: "Delete Account",
            icon: MdDelete,
            href: "/account/delete",
        },
    ]
    return (
        <div className="flex flex-row h-full ">
            <div className="h-full w-48 bg-slate-500 flex flex-col py-5 items-center">
                <h2 className="text-2xl text-center">
                    {username ? `${username}'s` : "Your"} account
                </h2>
                <div className="w-full flex flex-col gap-1 mt-5">
                    {routes.map((item) => {
                        return (
                            <div
                                key={item.label}
                                className="w-full bg-slate-600 relative after:absolute after:transition-all after:w-0 after:left-0 after:bottom-0 after:h-1 after:bg-slate-400 after:rounded-none hover:after:w-full"
                            >
                                <Link
                                    className="transition h-full py-5 flex justify-center items-center gap-1 peer"
                                    href={item.href}
                                >
                                    <item.icon size={26} />
                                    <p>{item.label}</p>
                                </Link>
                            </div>
                        )
                    })}
                    {/* <div className="w-full bg-slate-600 relative after:absolute after:transition-all after:w-0 after:left-0 after:bottom-0 after:h-1 after:bg-slate-400 after:rounded-none hover:after:w-full">
                        <Link
                            className=" transition h-full py-5 flex justify-center items-center gap-1 peer"
                            href={"/123"}
                        >
                            <CgProfile size={20} />
                            <p className="text-xl underline">TEST</p>
                        </Link>
                    </div>
                    <div className="w-full flex justify-center items-center gap-1">
                        <CgProfile size={20} />
                        <p className="text-xl underline">Profile</p>
                    </div>
                    <div className="w-full flex justify-center items-center gap-1">
                        <MdSecurity size={20} />
                        <p className="text-xl underline">Security</p>
                    </div>
                    <div className="w-full flex justify-center items-center gap-1">
                        <MdOutlinePrivacyTip size={20} />
                        <p className="text-xl underline">Privacy</p>
                    </div>
                    <div className="w-full flex justify-center items-center gap-1">
                        <MdNotifications size={20} />
                        <p className="text-xl underline">Notifications</p>
                    </div>
                    <div className="w-full flex justify-center items-center gap-1">
                        <MdPayments size={20} />
                        <p className="text-xl underline">Purchases</p>
                    </div>
                    <div className="w-full flex justify-center items-center gap-1">
                        <MdOutlineContactSupport size={20} />
                        <p className="text-xl underline">Support</p>
                    </div>
                    <div className="w-full flex justify-center items-center gap-1">
                        <MdDelete size={20} />
                        <p className="text-xl underline">Delete Account</p>
                    </div> */}
                </div>
            </div>
            <div className="flex-1 pl-0 overflow-x-auto">
                <div className="mx-24 my-12">
                    <h1 className="text-3xl">Welcome back to Hitorium</h1>
                    <div className="flex flex-col mt-10 gap-10">
                        <h2>General account information:</h2>
                        <pre>{JSON.stringify(user, null, 2)}</pre>
                    </div>
                </div>
            </div>
        </div>
    )
}

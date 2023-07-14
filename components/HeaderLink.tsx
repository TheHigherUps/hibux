"use client"

import Link from "next/link"
import { twMerge } from "tailwind-merge"

interface HeaderLinkProps {
    label: string
    href: string
    active: boolean
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ label, href, active }) => {
    return (
        <Link
            href={href}
            className={twMerge(
                "relative h-full text-neutral-400 hover:text-white transition-all after:absolute after:w-0 hover:after:w-full after:h-1 after:bg-white after:inset-y-full after:left-0 after:rounded-full after:transition-all",
                active && "after:w-full text-white "
            )}
        >
            {label}
        </Link>
    )
}

export default HeaderLink

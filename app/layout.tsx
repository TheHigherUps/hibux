import Header from "@/components/Header"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Noto_Sans, Pangolin } from "next/font/google"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const inter = Inter({ subsets: ["latin"] })
// const font = Noto_Sans({
//     subsets: ["latin"],
//     weight: ["100", "200", "300", "400", "600", "700", "800", "900"],
// })
const font = Pangolin({
    subsets: ["latin"],
    weight: ["400"],
})

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = createServerComponentClient({ cookies })
    const {
        data: { user },
    } = await supabase.auth.getUser()
    return (
        <html lang="en">
            <body className={font.className}>
                <Header user={user}>{children}</Header>
            </body>
        </html>
    )
}

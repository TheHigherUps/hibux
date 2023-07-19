import { Pangolin } from "next/font/google"
import "../globals.css"

const font = Pangolin({
    subsets: ["latin"],
    weight: ["400"],
})

export default function PlayspaceLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={font.className}>{children}</body>
        </html>
    )
}

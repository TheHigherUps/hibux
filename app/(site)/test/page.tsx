"use client"
import Button from "@/components/Button"
import HibuxCard from "@/components/HibuxCard"

export default function Index() {
    const packages = [
        {
            name: "Loser Package (500 HiBux)",
            description:
                "Be like Coleen Ballenger in 2011 and talk to minors in a loser way ",
            price: 4.99,
        },
        {
            name: "Highest Packer (1300 HiBux + 200 Bonus)",
            description:
                "Become a cool beans member of HiBlox and purchase this package. Comes with a free random item included to add to your avatar.",
            price: 12.99,
            featured: true,
        },
        {
            name: "Delightful Package (900 HiBux + 100 Bonus)",
            description: "Become cool like Delightful ",
            price: 8.99,
        },
    ]
    return (
        <div className="m-24">
            <Button variant="secondary" size="lg">
                Sign in
            </Button>
        </div>
    )
}

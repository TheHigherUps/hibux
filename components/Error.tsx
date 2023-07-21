"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

const errorVariants = cva("transition-all ", {
    variants: {
        variant: {
            default: "outline",
            outline: "bg-red-500 hover:bg-red-600",
            filled: "border hover:bg-neutral-400/50 hover:text-white",
        },
        size: {
            default: "rounded-md px-4 py-2",
            sm: "h-9 rounded-md px-3 py-3",
            lg: "rounded-xl px-8 py-3",
            icon: "h-10 w-10",
        },
        severity: {
            success: "",
            alert: "",
            wanring: "",
            info: "",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
})

type ErrorProps = VariantProps<typeof errorVariants> &
    React.HTMLAttributes<HTMLDivElement> & {
        open: boolean
    }

const Error: React.FC<ErrorProps> = ({
    className,
    variant,
    size,
    children,
    open,
    ...props
}) => {
    return (
        <div
            className={twMerge(
                errorVariants({ variant, size, className }),
                open ? "" : "h-0"
            )}
        >
            {children}
        </div>
    )
}

export default Error

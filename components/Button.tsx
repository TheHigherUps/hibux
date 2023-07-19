"use client"
import { forwardRef } from "react"
import { clsx } from "clsx"
import { VscLoading } from "react-icons/vsc"
import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVarients> & {
        loading?: boolean
    }

const LoadingState = () => {
    return (
        <div className="flex items-center justify-center py-1">
            <VscLoading className="animate-spin" />
        </div>
    )
}

const buttonVarients = cva(
    "cursor-pointer text-center items-center inline-flex justify-center relative transition outline-none disabled:cursor-not-allowed active:scale-95",
    {
        variants: {
            variant: {
                default:
                    "bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 disabled:text-white/50",
                destructive: "bg-red-500 hover:bg-red-600",
                outline: "border hover:bg-neutral-400/50 hover:text-white",
                secondary: "bg-neutral-200 text-black hover:bg-neutral-400",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "rounded-lg px-4 py-2",
                sm: "h-9 rounded-md px-3 py-3",
                lg: "rounded-xl px-8 py-3",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, children, loading, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={twMerge(
                    buttonVarients({ variant, size, className })
                )}
                {...props}
            >
                {loading ? <LoadingState /> : children}
            </button>
        )
    }
)
Button.displayName = "Button"
export default Button

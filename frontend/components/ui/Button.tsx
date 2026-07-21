import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: Variant;
    size?: Size;
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    fullWidth?: boolean;
}

export default function Button({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            disabled={disabled || loading}
            className={clsx(
                "btn inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",

                // Size
                {
                    "btn-sm": size === "sm",
                    "btn-md": size === "md",
                    "btn-lg": size === "lg",
                },

                // Variant (theme aware)
                {
                    "btn-neutral":
                        variant === "primary",

                    "btn-outline":
                        variant === "secondary",

                    "btn-ghost":
                        variant === "ghost",
                },

                fullWidth && "w-full",

                className
            )}
        >
            {loading && (
                <span className="loading loading-spinner loading-xs" />
            )}

            {!loading && leftIcon}

            <span>{children}</span>

            {!loading && rightIcon}
        </button>
    );
}
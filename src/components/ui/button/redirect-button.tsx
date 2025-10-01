import Link from "next/link";
import React from "react";

interface RedirectButtonProps {
    href: string
    children: React.ReactNode
    size?: "sm" | "md" | "lg";
}

export default function RedirectButton({children, href, size}: RedirectButtonProps) {

    const sizeClasses = {
        sm: "p-1.5 text-sm",
        md: "p-2 text-base",
        lg: "p-3 text-lg"
    };

    return (
        <div>
            <Link
                href={href}
                className={`rounded-lg font-medium transition-colors w-full bg-gray-300 hover:bg-gray-400 text-gray-800 ${sizeClasses[size || "md"]}`}
            >
                {children}
            </Link>
        </div>
    )
}
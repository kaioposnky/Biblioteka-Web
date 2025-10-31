interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
}

export default function Button({
                                   children,
                                   type = "button",
                                   variant = "primary",
                                   size = "md",
                                   disabled = false,
                                   onClick,
                                   className = ""
                               }: ButtonProps) {
    const baseClasses = "rounded-lg font-medium transition-colors";

    const variantClasses = {
        primary: "bg-gray-300 hover:bg-gray-400 text-gray-800",
        secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300",
        danger: "bg-red-500 hover:bg-red-600 text-white"
    };

    const sizeClasses = {
        sm: "p-1.5 text-sm",
        md: "p-2 text-base",
        lg: "p-3 text-lg"
    };

    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
        >
            {children}
        </button>
    );
}

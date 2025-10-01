interface FormProps {
    title?: string;
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent) => void;
    className?: string;
}

export default function Form({title, children, onSubmit, className = ""}: FormProps) {
    return (
        <div className={`bg-gray-200 rounded-lg p-10 w-full max-w-md mx-auto ${className}`}>
            {title && (
                <h1 className="text-2xl font-bold mb-6">
                    {title}
                </h1>
            )}
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
                {children}
            </form>
        </div>
    )
}
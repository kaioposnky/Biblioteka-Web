import {ComponentPropsWithoutRef, forwardRef} from "react";

interface TextInputProps extends ComponentPropsWithoutRef<"input"> {
    label: string;
}

function TextInputBase({label, className, ...props}: TextInputProps, ref: React.Ref<HTMLInputElement>) {
    const inputId = props.name || label;

    return (
        <div className={`flex flex-col gap-2 ${className || ''}`}>
            <label htmlFor={inputId} className="text-sm font-medium mt-2">{label}</label>
            <input
                id={inputId}
                ref={ref}
                className="bg-white w-full p-2 rounded-md border border-gray-300"
                {...props}
            />
        </div>
    );
}

export default forwardRef(TextInputBase);
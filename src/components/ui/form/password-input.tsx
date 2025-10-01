import {ComponentPropsWithoutRef, forwardRef} from "react";

interface PasswordInputProps extends ComponentPropsWithoutRef<"input"> {
    label: string;
}

function PasswordInputBase({label, ...props}: PasswordInputProps, ref: React.Ref<HTMLInputElement>) {
    const inputId = props.name || label;

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={inputId} className="text-sm font-medium mt-2">
                {label}
            </label>
            <input
                id={inputId}
                type="password"
                ref={ref}
                className="bg-white w-full p-2 rounded-md border border-gray-300"
                {...props}
            />
        </div>
    );
}

export default forwardRef(PasswordInputBase);
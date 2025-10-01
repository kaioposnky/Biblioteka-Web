"use client"

import TextInput from "@/components/ui/form/text-input";
import PasswordInput from "@/components/ui/form/password-input";
import Form from "@/components/ui/form/form";
import Button from "@/components/ui/button/button";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {signIn} from "@/lib/auth/sign-in";
import {useRouter} from "next/navigation";

const loginSchema = z.object({
    email: z.email("Email inválido"),
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});
export type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        const result = await signIn(data);
        if (result.success) {
            router.push('/emprestimo');
        }
        setIsLoading(false);
    }

    return (
        <Form title="Fazer Login" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <TextInput
                    label="Email"
                    placeholder="seu@email.com"
                    {...register("email")}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
                <PasswordInput
                    label="Senha"
                    placeholder="Sua senha"
                    {...register("password")}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <Button
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? "Entrando..." : "Fazer Login"}
            </Button>
        </Form>
    )
}
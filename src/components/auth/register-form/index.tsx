"use client"

import TextInput from "@/components/ui/form/text-input";
import PasswordInput from "@/components/ui/form/password-input";
import Form from "@/components/ui/form/form";
import Button from "@/components/ui/button/button";
import {useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signUp} from "@/lib/auth/sign-up";
import {useRouter} from "next/navigation";

const registerSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.email("Email inválido"),
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string().min(8, "Confirmação de senha é obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {register, handleSubmit, formState: {errors}} = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    });

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);
        const result = await signUp(data);
        if (result.success) {
            router.push('/auth/login');
        }
        setIsLoading(false);
    }

    return (
        <Form title="Criar Conta" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <TextInput
                    label="Nome"
                    placeholder="Seu nome completo"
                    {...register("name")}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

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
                    placeholder="Crie uma senha forte"
                    {...register("password")}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div>
                <PasswordInput
                    label="Confirmar Senha"
                    placeholder="Digite a senha novamente"
                    {...register("confirmPassword")}
                />
                {errors.confirmPassword &&
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <Button
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? "Criando Conta..." : "Criar Conta"}
            </Button>
        </Form>
    )
}
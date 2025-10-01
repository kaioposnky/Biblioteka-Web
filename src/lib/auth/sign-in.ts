import {signIn as nextAuthSignIn} from "next-auth/react"
import toast from "react-hot-toast"
import {LoginFormData} from "@/components/auth/login-form"

export const signIn = async (formData: LoginFormData) => {
    let loadingToast: string | undefined;

    try {
        loadingToast = toast.loading("Checando credenciais...")

        const result = await nextAuthSignIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
        })

        toast.dismiss(loadingToast)

        if (result?.error) {
            toast.error("Credenciais inválidas")
            return {success: false, data: null, error: {message: result.error}}
        }

        if (result?.ok) {
            toast.success("Login realizado com sucesso!")
            return {success: true, data: result, error: null}
        }

        toast.error("Erro desconhecido")
        return {success: false, data: null, error: {message: "Erro desconhecido"}}
    } catch (error) {
        if (loadingToast) {
            toast.dismiss(loadingToast)
        }
        toast.error("Erro ao fazer login")
        return {success: false, data: null, error: {message: "Erro interno"}}
    }
}
import toast from "react-hot-toast"
import {RegisterFormData} from "@/components/auth/register-form"
import {auth} from "@/services/auth"
import {ErrorResponse} from "@/services/api";

export const signUp = async (formData: RegisterFormData) => {
    let loadingToast: string | undefined;

    try {
        loadingToast = toast.loading("Criando conta...")

        const response = await auth.register(formData);

        toast.dismiss(loadingToast)
        toast.success(response.message || "Conta criada com sucesso!")

        return {
            success: true,
            data: response.data,
            error: null
        }
    } catch (error) {
        if (loadingToast) {
            toast.dismiss(loadingToast)
        }

        const apiError = error as ErrorResponse;
        toast.error(apiError.message || "Erro ao criar conta");

        return {
            success: false,
            data: null,
            error: {
                message: apiError.message || "Erro ao criar conta",
                status: apiError.statusCode,
                statusText: apiError.message
            }
        }
    }
}
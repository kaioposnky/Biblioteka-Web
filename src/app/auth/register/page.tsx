import RegisterForm from "@/components/auth/register-form";
import RedirectButton from "@/components/ui/button/redirect-button";

export default function RegisterPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-y-5">
            <RegisterForm/>


            <RedirectButton href={"/auth/login"} size={"lg"}>
                Fazer Login
            </RedirectButton>
        </div>
    )
}
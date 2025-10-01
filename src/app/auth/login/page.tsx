import LoginForm from "@/components/auth/login-form";
import RedirectButton from "@/components/ui/button/redirect-button";

export default function LoginPage() {

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-y-5">
            <LoginForm/>

            <RedirectButton href={"/auth/register"} size={"lg"}>
                Criar conta
            </RedirectButton>
        </div>
    )
}
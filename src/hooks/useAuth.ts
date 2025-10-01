import {signOut, useSession} from "next-auth/react"
import {useRouter} from "next/navigation"

export const useAuth = () => {
    const {data: session, status} = useSession();
    const router = useRouter();

    const logout = async () => {
        await signOut({
            redirect: false,
            callbackUrl: '/'
        })
        router.push('/')
    }

    return {
        user: session?.user,
        isLoading: status === "loading",
        isAuthenticated: !!session,
        logout
    }
}
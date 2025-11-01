"use client"

import Link from "next/link";
import {useAuth} from "@/hooks/useAuth";
import Button from "@/components/ui/button/button";

export function Header() {
    const {isAuthenticated, logout} = useAuth();

    const linkStyle = "text-4xl font-bold hover:text-emerald-500 transition-colors";

    return (
        <header className={"bg-zinc-900 p-5 text-white"}>
            <div className={"container mx-auto flex items-center justify-between"}>
                <div className={"" +
                    "text-4xl " +
                    "font-bold "}>
                    <Link href={'/'} className={linkStyle}>
                        Biblioteka
                    </Link>
                </div>

                <nav className={"flex items-center gap-x-6 text-sm"}>
                    <Link href={'/'} className={linkStyle}>
                        Home
                    </Link>
                    <Link href={'/biblioteca'} className={linkStyle}>
                        Biblioteca
                    </Link>
                    <Link href={'/emprestimo'} className={linkStyle}>
                        Empréstimo
                    </Link>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-x-4">
                            <Link href={'/profile'} className={linkStyle}>
                                Meu Perfil
                            </Link>
                            <Button
                                onClick={logout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                            >
                                Sair
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-x-4">
                            <Link href={'/auth/login'} className={linkStyle}>
                                Login
                            </Link>
                            <Link href={'/auth/register'} className={linkStyle}>
                                Registrar
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}
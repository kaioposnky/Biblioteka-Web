import Link from "next/link";

export function Header(){

    const linkStyle = "text-4xl font-bold hover:text-emerald-500 transition-colors";

    return(
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
                </nav>
            </div>
        </header>
    )
}
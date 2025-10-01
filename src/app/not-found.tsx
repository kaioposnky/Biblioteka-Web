import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className={"text-center font-bold mt-9 text-6xl"}>
                404 Página não encontrada!
            </h1>

            <p>A página que você está procurando não existe.</p>
            <Link href={"/"}>
                Voltar para a página inicial
            </Link>
        </div>
    );
}
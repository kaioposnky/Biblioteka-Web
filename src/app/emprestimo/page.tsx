import {checkSession} from '@/lib/session';
import EmprestimoItem from "@/components/emprestimo/emprestimoItem";
import {Emprestimo, getUserEmprestimos} from "@/services/emprestimo";

export default async function EmprestimoPage() {
    const session = await checkSession();

    const result = await getUserEmprestimos();
    const emprestimos = result ? result : [];

    return (
        <div className={"flex justify-center w-full"}>
            <div className={"flex flex-col items-center gap-y-10"}>
                <h1 className={"text-3xl font-bold text-emerald-700"}>Lista de seus empréstimos</h1>
                <div className={"flex flex-col items-center gap-y-5"}>

                    {
                        emprestimos.length > 0 ?
                        emprestimos.map((emprestimo : Emprestimo) => {
                        return <EmprestimoItem
                            id={emprestimo.id}
                            key={emprestimo.id}
                            bookTitle={emprestimo.bookTitle}
                            authorName={emprestimo.authorName}
                            loanDate={emprestimo.loanDate}
                            dueDate={emprestimo.dueDate}
                            returnDate={emprestimo.returnDate}
                            returned={emprestimo.returned}
                        />}) :

                        <p className={"text-2xl text-red-400"}>Nenhum empréstimo encontrado!</p>
                    }
                </div>
            </div>
        </div>
    );
}

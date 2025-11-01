"use client"

import {Emprestimo, getEmprestimo} from "@/services/emprestimo";
import {BookItem} from "@/components/book/BookItem";
import Book, {getBook} from "@/services/book";
import {useEffect, useState} from "react";
import {EmprestimoRenovateButton} from "@/components/emprestimo/EmprestimoRenovateButton";

export default function RenovateEmprestimoScreen({params}: {
    params: Promise<{ id: string }>
}) {
    const [isLoading, setLoading] = useState(true);
    const [numericId, setNumericId] = useState<number>(0);
    const [emprestimo, setEmprestimo] = useState<Emprestimo | null>(null);
    const [book, setBook] = useState<Book | null>(null);
    const [dayAmount, setDayAmount] = useState(1);

    useEffect(() => {
        async function getParams() {
            const bookParam: { id: string } = await params;
            setNumericId(Number(bookParam.id));
        }

        getParams().catch(error => {
            console.error("Erro ao obter params:", error);
        });
    }, [params])

    useEffect(() =>{
        if (numericId > 0) {
            getEmprestimo(Number(numericId)).then(async (emprestimo) => {
                setEmprestimo(emprestimo);
                const bookResult = await getBook(emprestimo?.bookId as number);
                setBook(bookResult);
                setLoading(false);
            }).catch(error => {
                console.error("Erro ao buscar emprestimo:", error);
                setBook(null);
                setLoading(false);
            });
        }
    }, [numericId])

    if(isLoading){
        return (<h3>Carregando...</h3>)
    }

    if(book === null || emprestimo === null) {
        return (<h3>Empréstimo ou livro não encontrados!</h3>)
    }

    return (
        <div className={"flex justify-center w-full"}>
            <div className={"flex flex-col items-center gap-y-10"}>
                <h1 className={"text-3xl font-bold text-emerald-700"}>Confirmação de empréstimo do livro</h1>
                <div className={"flex flex-col items-center gap-y-5"}>
                    {/*Escolher quantidade de dias */}
                    <select
                        value={dayAmount}
                        onChange={(e) => setDayAmount(Number(e.target.value))}
                        className="border rounded p-2 mb-4"
                    >
                        <option value={1}>Selecione a quantidade de dias</option>
                        <option value={1}>1 dias</option>
                        <option value={2}>2 dias</option>
                        <option value={3}>3 dias</option>
                        <option value={4}>4 dias</option>
                    </select>
                    <BookItem
                        id={numericId}
                        title={book.title}
                        authorName={book.authorName}
                        genreName={book.genreName}
                        isAvailable={book.isAvailable}
                    />
                    {book &&
                        <EmprestimoRenovateButton
                            loanId={numericId}
                            dayAmount={dayAmount}
                            dueDate={emprestimo.dueDate}
                        />
                    }
                </div>
            </div>
        </div>
    );
}
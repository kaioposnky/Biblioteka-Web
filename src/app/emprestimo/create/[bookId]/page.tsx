"use client"

import Book, { getBook } from "@/services/book";
import { BookItem } from "@/components/book/BookItem";
import { EmprestimoButton } from "@/components/emprestimo/EmprestimoButton";
import {useEffect, useState} from "react";

export default function EmprestimoPage({ params }: {
    params: Promise<{ bookId: string }>
}) {
    const [numericId, setNumericId] = useState<number>(0);
    const [book,setBook] = useState<Book | null>(null);
    const [dayAmount, setDayAmount] = useState(0);

    useEffect(() => {
        async function getParams() {
            const bookParam: { bookId: string } = await params;
            setNumericId(Number(bookParam.bookId));
        }

        getParams().catch(error => {
            console.error("Erro ao obter params:", error);
        });
    }, [params])

    useEffect(() =>{
        if (numericId > 0) {
            getBook(numericId).then((book) => {
                setBook(book)
                console.log(book);
            }).catch(error => {
                console.error("Erro ao buscar livro:", error);
                setBook(null);
            });
        }
    }, [numericId])

    if (book === null){
        return (<p className={"flex justify-center text-lg"}>
            Livro não encontrado!
        </p>);
    }

    const bookContent = (
        <BookItem
            id={numericId}
            title={book.title}
            authorName={book.authorName}
            genreName={book.genreName}
            isAvailable={book.isAvailable}
        />
    );

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
                        <option value={3}>Selecione a quantidade de dias</option>
                        <option value={3}>3 dias</option>
                        <option value={7}>7 dias</option>
                        <option value={10}>10 dias</option>
                        <option value={14}>14 dias</option>
                    </select>
                    {bookContent}
                    {book &&
                        <EmprestimoButton
                            bookId={numericId}
                            isAvailable={book.isAvailable}
                            dayAmount={dayAmount}
                        />
                    }
                </div>
            </div>
        </div>
    );
}
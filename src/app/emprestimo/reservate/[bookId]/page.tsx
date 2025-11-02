"use client"

import Book, { getBook } from "@/services/book";
import { BookItem } from "@/components/book/BookItem";
import { useEffect, useState } from "react";
import { ReservaButton } from "@/components/emprestimo/ReservaButton";
import { Temporal } from "@js-temporal/polyfill";

export default function ReservateBookScreen({ params }: { 
    params: Promise<{ bookId: string }> 
}) {
    const [numericId, setNumericId] = useState<number>(0);
    const [book, setBook] = useState<Book | null>(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getParams() {
            const bookParam: { bookId: string } = await params;
            setNumericId(Number(bookParam.bookId));
        }

        getParams().catch(error => {
            console.error("Erro ao obter params:", error);
        });
    }, [params]);

    useEffect(() =>{
        if (numericId > 0) {
            getBook(numericId).then((book) => {
                setBook(book)
            }).catch(error => {
                console.error("Erro ao buscar livro:", error);
                setBook(null);
            });
        }
    }, [numericId]);

    useEffect(() => {
        if (startDate && endDate) {
            const start = Temporal.PlainDate.from(startDate);
            const end = Temporal.PlainDate.from(endDate);
            const difference = end.since(start).days;

            if (difference > 14) {
                setError("O período de reserva não pode exceder 14 dias.");
            } else if (difference < 0) {
                setError("A data de fim não pode ser anterior à data de início.");
            } else {
                setError(null);
            }
        }
    }, [startDate, endDate]);

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
            canBorrow={false}
        />
    );

    return (
        <div className={"flex justify-center w-full"}>
            <div className={"flex flex-col items-center gap-y-10"}>
                <h1 className={"text-3xl font-bold text-emerald-700"}>Reserva de Livro</h1>
                <div className={"flex flex-col items-center gap-y-5"}>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="startDate">Data de Início:</label>
                            <input
                                type="date"
                                id="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="border rounded p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="endDate">Data de Fim:</label>
                            <input
                                type="date"
                                id="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="border rounded p-2"
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {bookContent}
                    {book &&
                        <ReservaButton
                            bookId={numericId}
                            startDate={startDate}
                            endDate={endDate}
                            disabled={!!error || !startDate || !endDate}
                        />
                    }
                </div>
            </div>
        </div>
    );
}
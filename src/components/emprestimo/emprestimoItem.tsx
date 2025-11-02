"use server"

import {Temporal} from '@js-temporal/polyfill';
import Image from "next/image";
import Link from "next/link";

export interface EmprestimoProps {
    id: number;
    bookTitle: string;
    authorName: string;
    loanDate: Temporal.PlainDate;
    dueDate: Temporal.PlainDate;
    returnDate: Temporal.PlainDate | null;
    returned: boolean;
    key: number;
}

export default async function EmprestimoItem({
                                       id,
                                       bookTitle,
                                       authorName,
                                       loanDate,
                                       dueDate,
                                       returnDate,
                                       returned
                                   }: EmprestimoProps) {

    const delayDays =  dueDate.until(returnDate ?? Temporal.Now.plainDateISO()).days;
    const realReturnDate = returnDate ? returnDate.toLocaleString() : "NÃO DEVOLVIDO";

    return (
        <div className={"rounded-lg border-2 border-cyan-700 bg-cyan-300 p-2 w-full"}>
            <div className={"flex flex-col gap-y-3"}>
                {/*Nome do livro e autor*/}
                <div className={"flex justify-center"}>
                    <p className={"flex flex-col gap-y-0.5"}>
                        <span className={"text-xl font-bold"}>{bookTitle}</span>
                        <span className={"text-lg"}>de: {authorName}</span>
                    </p>
                </div>

                <div className={"flex justify-between"}>
                    {/*    Capa do livro*/}
                    <div className={""}>
                        <Image
                            src={"/genericBook.png"}
                            alt={`Capa do livro ${bookTitle}`}
                            width={150}
                            height={150}
                        />
                    </div>

                    {/*Informações de data*/}
                    <div className={"flex flex-col gap-y-1"}>
                        <p>Data de empréstimo: {loanDate.toLocaleString()}</p>
                        <p>Data de devolução prevista: {dueDate.toLocaleString()}</p>
                        <p>Data de devolução real: {realReturnDate}</p>
                        <p>Dias atrasado: {delayDays < 0 ? 0 : delayDays}</p>

                        <div className={"flex justify-center mt-1"}>
                            {returned ?
                                <p className={"text-green-500 font-bold"}>Livro devolvido</p>
                                :
                                <p className={"text-red-500 font-bold"}>Livro não devolvido</p>
                            }
                        </div>
                    </div>
                </div>


            </div>

            {/*Carrega o botão de ver multa caso esteja atrasado*/}
            {!returned && delayDays > 0 &&
                <div className={"flex justify-center"}>
                    <Link
                        className={"rounded-lg bg-cyan-200 border-black border-2 p-2"}
                        href={`/emprestimo/${id}`}>
                        Ver Multa
                    </Link>
                </div>
            }
            {delayDays < 0 && !returned &&
                <div className={"flex justify-center"}>
                    <Link
                        className={"rounded-lg bg-cyan-200 border-black border-2 p-2"}
                        href={`/emprestimo/${id}/renovate`}>
                        Renovar Empréstimo
                    </Link>
                </div>
            }
        </div>
    )
}

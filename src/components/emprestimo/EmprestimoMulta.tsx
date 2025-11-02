"use client"

import {Temporal} from '@js-temporal/polyfill';
import Image from "next/image";
import Button from "@/components/ui/button/button";
import {postMultaPay} from "@/services/multa";
import toast from "react-hot-toast";

export interface EmprestimoMultaProps {
    id: number;
    bookTitle: string;
    authorName: string;
    loanDate: string;
    dueDate: string;
    returnDate: string | null;
    payed: boolean;
    costPerDay: number;
    key: number;
}

export default function EmprestimoMultaItem({
                                           id,
                                           bookTitle,
                                           authorName,
                                           loanDate,
                                           dueDate,
                                           returnDate,
                                           payed,
                                           costPerDay
                                       }: EmprestimoMultaProps) {


    const loanDatePlain = Temporal.PlainDate.from(loanDate);
    const dueDatePlain =  Temporal.PlainDate.from(dueDate);

    const timezone = Temporal.Now.timeZoneId();
    const returnDatePlain = returnDate ? Temporal.PlainDate.from(returnDate) : Temporal.Now.plainDateISO(timezone);

    const delayDays =  dueDatePlain.until(returnDatePlain).days;
    const totalCost = delayDays * costPerDay;

    const payFine = () => {
        "use client"
        postMultaPay(id).then(() =>
            toast.success("Multa paga com sucesso!")
        ).catch((error: any) =>
            toast.error("Ocorreu um erro ao pagar a multa!")
        );
    }

    return (
        <div className={"rounded-lg border-2 border-cyan-700 bg-cyan-300 p-4 w-full shadow-md"}>
            <div className={"flex flex-col gap-y-4"}>
                {/*Nome do livro e autor*/}
                <div className={"flex justify-center"}>
                    <p className={"flex flex-col gap-y-1 text-center"}>
                        <span className={"text-xl font-bold"}>{bookTitle}</span>
                        <span className={"text-lg"}>de: {authorName}</span>
                    </p>
                </div>

                <div className={"flex flex-col md:flex-row gap-y-4 gap-x-6"}>
                    {/*    Capa do livro*/}
                    <div>
                        <Image
                            src={"/genericBook.png"}
                            alt={`Capa do livro ${bookTitle}`}
                            width={150}
                            height={150}
                            className={"rounded-md shadow-sm"}
                        />
                    </div>

                    {/*Informações de data*/}
                    <div className={"flex flex-col gap-y-2 flex-1"}>
                        <p className={"text-sm"}>Dia do empréstimo: {`${loanDatePlain.day}/${loanDatePlain.month}/${loanDatePlain.year}`}</p>
                        <p className={"text-sm"}>Dias atrasado: {delayDays}</p>
                        <p className={"text-sm"}>Valor diário da multa: {costPerDay}</p>
                        <p className={"text-sm"}>Valor total da multa: {totalCost}</p>
                        <div className={"flex justify-center mt-2"}>
                            {payed ?
                                <p className={"text-green-700 font-bold text-sm"}>Multa paga</p>
                                : <p className={"text-red-700 font-bold text-sm"}>Multa não paga</p>
                            }
                        </div>
                        {!payed &&
                            <Button
                                className={"mt-2 w-full"}
                                onClick={payFine}
                            >
                                Pagar a multa
                            </Button>
                        }
                    </div>
                </div>


            </div>
        </div>
    )
}
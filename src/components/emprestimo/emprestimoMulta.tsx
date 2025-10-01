import {Temporal} from '@js-temporal/polyfill';
import Image from "next/image";

export interface EmprestimoMultaProps {
    bookTitle: string;
    authorName: string;
    loanDate: Temporal.PlainDate;
    dueDate: Temporal.PlainDate;
    returnDate: Temporal.PlainDate | null;
    payed: boolean;
    costPerDay: number;
    key: number;
}

export default function EmprestimoMultaItem({
                                           bookTitle,
                                           authorName,
                                           loanDate,
                                           dueDate,
                                           returnDate,
                                           payed,
                                           costPerDay
                                       }: EmprestimoMultaProps) {

    if(returnDate == null){
        returnDate = Temporal.Now.plainDateISO();
    }

    const delayDays =  dueDate.until(returnDate).days;
    const totalCost = delayDays * costPerDay;

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
                        <p>Dias atrasado: {delayDays}</p>
                        <p>Valor diário da multa: {costPerDay}</p>
                        <p>Valor total da multa: {totalCost}</p>
                        <div className={"flex justify-center mt-1"}>
                            {payed ?
                                <p className={"text-green-500 font-bold"}>Multa paga</p>
                                :
                                <p className={"text-red-500 font-bold"}>Multa não paga</p>
                            }
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
import {getEmprestimoMulta, EmprestimoMulta} from "@/services/emprestimo";
import EmprestimoMultaItem from "@/components/emprestimo/emprestimoMulta";
import { Temporal } from "@js-temporal/polyfill";

export default async function EmprestimoPage({params}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const numericId = parseInt(id);
    const result : EmprestimoMulta | null = await getEmprestimoMulta(numericId);

    let loanPlainDate: Temporal.PlainDate;
    let duePlainDate: Temporal.PlainDate;
    let returnDate: Temporal.PlainDate | null;
    if (result === null) {
      loanPlainDate = Temporal.Now.plainDateISO();
      duePlainDate = Temporal.Now.plainDateISO();
      returnDate = Temporal.Now.plainDateISO();
    } else {
      loanPlainDate = Temporal.PlainDate.from(result.loanDate);
      duePlainDate = Temporal.PlainDate.from(result.dueDate);
      returnDate =
        result.returnDate === null
          ? null
          : Temporal.PlainDate.from(result.returnDate);
    }

    const multa =
        result != null ?
        (
        <EmprestimoMultaItem
            key={result.loanFineId}
            bookTitle={result.bookTitle}
            authorName={result.authorName}
            loanDate={loanPlainDate}
            dueDate={duePlainDate}
            returnDate={returnDate}
            costPerDay={result.costPerDay}
            payed={false}
        />
    ) :
        <p className={"flex justify-center text-lg"}>
            Multa não encontrada!
        </p>
    ;

    return (
        <div className={"flex justify-center w-full"}>
            <div className={"flex flex-col items-center gap-y-10"}>
                <h1 className={"text-3xl font-bold text-emerald-700"}>Informações de multa do empréstimo</h1>
                <div className={"flex flex-col items-center gap-y-5"}>
                    {multa}
                </div>
            </div>
        </div>
    );
}

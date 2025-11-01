"use client";

import Button from "@/components/ui/button/button";
import {postRenovateLoan} from "@/services/emprestimo";
import { Temporal } from "@js-temporal/polyfill";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

interface EmprestimoRenovateButtonProps {
    loanId: number;
    dayAmount: number;
    dueDate: string;
}

export function EmprestimoRenovateButton({ loanId, dayAmount, dueDate }: EmprestimoRenovateButtonProps) {
    const router = useRouter();

    const renovateBook = async () => {
        if (dayAmount <= 0){
            toast.error("Selecione 1 ou mais dias!'");
            return;
        }
        const dueDatePlain = Temporal.PlainDate.from(dueDate);
        const addDays = new Temporal.Duration(0, 0, 0, dayAmount);
        const finalDueDay = dueDatePlain.add(addDays);
        const result = await postRenovateLoan(loanId, finalDueDay.toString());

        if (result != null) {
            toast.success("Empréstimo renovado com sucesso!");
        } else {
            toast.error("Erro renovar empréstimo do livro!");
        }

        router.push("/emprestimo");
    };

    return (
        <Button
            type={"button"}
            size={"lg"}
            onClick={renovateBook}
        >
            Renovar empréstimo por {dayAmount} dias
        </Button>
    );
}

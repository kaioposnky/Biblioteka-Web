"use client";

import Button from "@/components/ui/button/button";
import { postEmprestimo } from "@/services/emprestimo";
import { Temporal } from "@js-temporal/polyfill";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

interface EmprestimoButtonProps {
    bookId: number;
    isAvailable: boolean;
    dayAmount: number;
}

export function EmprestimoButton({ bookId, isAvailable, dayAmount }: EmprestimoButtonProps) {
    const router = useRouter();

    const loanBook = async () => {
        const timezone = Temporal.Now.timeZoneId();
        const now = Temporal.Now.plainDateISO(timezone);
        const addDays = new Temporal.Duration(0, 0, 0, dayAmount);
        const dueDate = now.add(addDays);
        const result = await postEmprestimo({ bookId: bookId, dueDate: dueDate.toString() });

        if (result != null) {
            toast.success("Livro pego emprestado com sucesso!");
        } else {
            toast.error("Erro ao pegar livro emprestado!");
        }

        router.push("/emprestimo");
    };

    return (
        <Button
            type={"button"}
            size={"lg"}
            onClick={loanBook}
            disabled={!isAvailable}
        >
            Pegar emprestado por {dayAmount} dias
        </Button>
    );
}

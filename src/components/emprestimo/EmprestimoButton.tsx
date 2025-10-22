"use client";

import Button from "@/components/ui/button/button";
import { postEmprestimo } from "@/services/emprestimo";
import { Temporal } from "@js-temporal/polyfill";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

interface EmprestimoButtonProps {
    bookId: number;
    isAvailable: boolean;
}

export function EmprestimoButton({ bookId, isAvailable }: EmprestimoButtonProps) {
    const router = useRouter();

    const loanBook = async () => {
        const timezone = Temporal.Now.timeZoneId();
        const now = Temporal.Now.plainDateISO(timezone);
        const sevenDays = new Temporal.Duration(0, 0, 0, 7);
        const dueDate = now.add(sevenDays);
        const result = await postEmprestimo({ bookId: bookId, dueDate: dueDate.toString() });

        if (result != null) {
            toast.success("Livro pego emprestado com sucesso!");
        } else {
            toast.error("Erro ao pegar livro emprestado!");
        }

        router.push("/biblioteca");
    };

    return (
        <Button
            type={"button"}
            size={"lg"}
            onClick={loanBook}
            disabled={!isAvailable}
        >
            Pegar emprestado por 7 dias
        </Button>
    );
}

'use client';

import Button from "@/components/ui/button/button";
import { postBookLoanReservation } from "@/services/emprestimo";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ReservaButtonProps {
  bookId: number;
  startDate: string;
  endDate: string;
  disabled: boolean;
}

export function ReservaButton({ bookId, startDate, endDate, disabled }: ReservaButtonProps) {
  const router = useRouter();

  const reserveBook = async () => {
    if (!startDate || !endDate) {
      toast.error("Por favor, selecione as datas de início e fim da reserva.");
      return;
    }


    const result : { success: boolean, message: string } = await postBookLoanReservation(bookId, startDate, endDate);
    if(result.success){
      toast.success("Livro reservado com sucesso!");
      router.push("/emprestimo");
    } else {
      toast.error(result.message);
    }

  };

  return (
    <Button
      type={"button"}
      size={"lg"}
      onClick={reserveBook}
      disabled={disabled}
    >
      Reservar Livro
    </Button>
  );
}

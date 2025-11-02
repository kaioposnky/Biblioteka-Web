"use client"

import { Emprestimo, getLoansForBook, getUserForLoan } from "@/services/emprestimo";
import Button from "@/components/ui/button/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BookItemAdminProps {
  id: number;
  title: string;
  authorName: string;
  genreName: string;
  isAvailable: boolean;
}

export function BookItemAdmin({
  id,
  title,
  authorName,
  genreName,
  isAvailable,
}: BookItemAdminProps) {
  const [loans, setLoans] = useState<Emprestimo[] | null>(null);
  const [borrowerName, setBorrowerName] = useState<string | null>(null);
  const [showLoans, setShowLoans] = useState(false);

  useEffect(() => {
    if (!isAvailable) {
      const fetchBorrower = async () => {
        const fetchedLoans = await getLoansForBook(id);
        if (fetchedLoans) {
          const currentLoan = fetchedLoans.find((loan) => !loan.returned);
          if (currentLoan) {
            const user = await getUserForLoan(currentLoan.id);
            if (user) {
              setBorrowerName(user.name);
            }
          }
        }
      };
      fetchBorrower();
    }
  }, [id, isAvailable]);

  const handleToggleLoans = async () => {
    if (!showLoans) {
      const fetchedLoans = await getLoansForBook(id);
      setLoans(fetchedLoans);
    }
    setShowLoans(!showLoans);
  };

  return (
    <div className={"rounded-lg border-2 border-cyan-700 bg-cyan-300 p-2 w-full"}>
      <div className={"flex flex-col gap-y-3"}>
        <div className={"flex justify-center"}>
          <p className={"flex flex-col gap-y-0.5"}>
            <span className={"text-xl font-bold"}>{title}</span>
            <span className={"text-lg"}>de: {authorName}</span>
            <span className={"text-lg"}>gênero: {genreName}</span>
          </p>
        </div>

        <div className={"flex justify-between"}>
          <div className={""}>
            <Image
              src={"/genericBook.png"}
              alt={`Capa do livro ${title}`}
              width={150}
              height={150}
            />
          </div>
        </div>

        {!isAvailable && borrowerName && (
          <div className="flex justify-center">
            <p className="text-lg font-semibold">Emprestado por: {borrowerName}</p>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-4">
        <Button
          onClick={handleToggleLoans}
          variant="secondary"
        >
          {showLoans ? "Ocultar Empréstimos" : "Ver Empréstimos"}
        </Button>
      </div>

      {showLoans && loans && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Histórico de Empréstimos:</h3>
          <ul>
            {loans.map((loan) => (
              <li key={loan.id} className="mt-2 border-t border-gray-400 pt-2">
                <Link href={`/emprestimo/${loan.id}`}>
                  <div className="cursor-pointer hover:bg-cyan-400 p-2 rounded-lg">
                    <p>Data do empréstimo: {new Date(loan.loanDate).toLocaleDateString()}</p>
                    <p>Data de devolução: {new Date(loan.dueDate).toLocaleDateString()}</p>
                    <p>Devolvido: {loan.returned ? "Sim" : "Não"}</p>
                    {loan.returnDate && <p>Data da devolução: {new Date(loan.returnDate).toLocaleDateString()}</p>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

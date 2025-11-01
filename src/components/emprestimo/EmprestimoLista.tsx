'use client';

import { Emprestimo } from '@/services/emprestimo';
import { Temporal } from '@js-temporal/polyfill';

interface EmprestimoListaProps {
    emprestimos: Emprestimo[];
    title: string;
}

export default function EmprestimoLista({ emprestimos, title }: EmprestimoListaProps) {
    if (emprestimos.length === 0) {
        return (
            <div className="w-full max-w-md p-8 mt-10 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-center text-gray-800">{title}</h3>
                <p className="text-center text-gray-500 mt-4">Nenhum empréstimo encontrado.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md p-8 mt-10 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-center text-gray-800">{title}</h3>
            <ul className="mt-6 space-y-4">
                {emprestimos.map((emprestimo) => {
                    const isAtivo = !emprestimo.returned;
                    const dueDate = Temporal.PlainDate.from(emprestimo.dueDate);

                    return (
                        <li key={emprestimo.id} className={`p-4 rounded-md ${isAtivo ? 'bg-yellow-100 border-yellow-400' : 'bg-green-100 border-green-400'} border`}>
                            <p className="font-semibold text-gray-900">{emprestimo.bookTitle}</p>
                            <p className="text-sm text-gray-600">Data de devolução: {dueDate.toString()}</p>
                            <p className={`text-sm font-bold ${isAtivo ? 'text-yellow-700' : 'text-green-700'}`}>
                                Status: {isAtivo ? 'Ativo' : 'Finalizado'}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
import api, {ErrorResponse, SuccessResponse} from './api';
import {z} from 'zod';
import {Temporal} from "@js-temporal/polyfill";

const toPlainDate = z.string().transform((str) => Temporal.PlainDate.from(str));

const EmprestimoSchema = z.object({
    id: z.number(),
    bookId: z.number(),
    bookTitle: z.string(),
    authorName: z.string(),

    loanDate: toPlainDate,
    dueDate: toPlainDate,

    // Tenta transformar em PlainDate, se não deixa como nulo
    returnDate: z.string().nullable().transform((str) =>
        str ? Temporal.PlainDate.from(str) : null
    ),

    returned: z.boolean(),
});

const EmprestimoMultaSchema = z.object({
    loanFineId: z.number(),
    bookLoanId: z.number(),
    bookTitle: z.string(),
    authorName: z.string(),

    loanDate: toPlainDate,
    dueDate: toPlainDate,

    returnDate: z.string().nullable().transform((str) =>
        str ? Temporal.PlainDate.from(str) : null
    ),

    costPerDay: z.number(),
    payed: z.boolean()
});

export type EmprestimoMulta = z.infer<typeof EmprestimoMultaSchema>;
export type Emprestimo = z.infer<typeof EmprestimoSchema>;
const EmprestimosArraySchema = z.array(EmprestimoSchema);

type ResponseDataList = {
    content: unknown[];
}


export const getUserEmprestimos = async (): Promise<Emprestimo[] | null> => {
    try{
        const response : SuccessResponse<ResponseDataList> = await api.get(`/books/loans/user`);

        const validation = await EmprestimosArraySchema.safeParseAsync(response.data.content);
        return validation.data || null;
    } catch (e){
        const apiError = e as ErrorResponse;
        console.error("Erro ao obter empréstimos do usuário:", apiError.message);
        return null;
    }
}

export const getEmprestimoMulta = async (emprestimoId: number): Promise<EmprestimoMulta | null> => {
    try{
        const response : SuccessResponse<EmprestimoMulta> = await api.get(`/books/loans/${emprestimoId}/fine`);

        const validation = await EmprestimoMultaSchema.safeParseAsync(response.data);

        return validation.data || null;
    } catch (e) {
        const apiError = e as ErrorResponse;
        console.error("Erro ao obter multa do empréstimo: ", apiError.message)
        return null;
    }
}
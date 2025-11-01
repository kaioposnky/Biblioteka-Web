"use server";

import { getAuthenticatedApi } from "./api";
import { ErrorResponse, SuccessResponse } from "./api";
import { z } from "zod";

const EmprestimoSchema = z.object({
  id: z.number(),
  bookId: z.number(),
  bookTitle: z.string(),
  authorName: z.string(),

  loanDate: z.string(),
  dueDate: z.string(),

  returnDate: z.string().nullable(),

  returned: z.boolean(),
});

const EmprestimoMultaSchema = z.object({
  loanFineId: z.number(),
  bookLoanId: z.number(),
  bookTitle: z.string(),
  authorName: z.string(),

  loanDate: z.string(),
  dueDate: z.string(),

  returnDate: z.string().nullable(),

  costPerDay: z.number(),
  payed: z.boolean(),
});

export type EmprestimoMulta = z.infer<typeof EmprestimoMultaSchema>;
export type Emprestimo = z.infer<typeof EmprestimoSchema>;
const EmprestimosArraySchema = z.array(EmprestimoSchema);

type ResponseDataList = {
  content: unknown[];
};

export const getUserEmprestimos = async (): Promise<Emprestimo[] | null> => {
  try {
    const api = await getAuthenticatedApi();
    const response: SuccessResponse<ResponseDataList> =
      await api.get(`/books/loans/user`);

    const validation = await EmprestimosArraySchema.safeParseAsync(
      response.data.content,
    );
    return validation.data || null;
  } catch (e) {
    const apiError = e as ErrorResponse;
    console.log("Erro ao obter empréstimos do usuário:", apiError.message);
    return null;
  }
};

export const getEmprestimoMulta = async (
  emprestimoId: number,
): Promise<EmprestimoMulta | null> => {
  try {
    const api = await getAuthenticatedApi();
    const response: SuccessResponse<EmprestimoMulta> = await api.get(
      `/books/loans/${emprestimoId}/fine`,
    );

    const validation = await EmprestimoMultaSchema.safeParseAsync(
      response.data,
    );

    return validation.data || null;
  } catch (e) {
    const apiError = e as ErrorResponse;
    console.log("Erro ao obter multa do empréstimo: ", apiError.message);
    return null;
  }
};

export const getEmprestimo = async (
    emprestimoId: number,
): Promise<Emprestimo | null> => {
  try {
    const api = await getAuthenticatedApi();
    const response: SuccessResponse<Emprestimo> = await api.get(
        `/books/loans/${emprestimoId}`,
    );

    const validation = await EmprestimoSchema.safeParseAsync(
        response.data,
    );

    return validation.data || null;
  } catch (e) {
    const apiError = e as ErrorResponse;
    console.log("Erro ao obter empréstimo: ", apiError.message);
    return null;
  }
};

export const postEmprestimo = async (emprestimo: {
  bookId: number;
  dueDate: string;
}) => {
  try {
    const api = await getAuthenticatedApi();
    const response: SuccessResponse<Emprestimo> = await api.post(
      `/books/loans`,
      emprestimo,
    );

    const validation = await EmprestimoSchema.safeParseAsync(response.data);
    return validation.data || null;
  } catch (e) {
    console.error("Erro ao criar empréstimo! ", e);
    return null;
  }
};

export const postRenovateLoan = async (loanId: number, newDueDate: string) => {
  try{
    const api = await getAuthenticatedApi();
    const response : SuccessResponse<Emprestimo> = await api.post(
        `/books/loans/${loanId}/renovate`, newDueDate);

    const validated = await EmprestimoSchema.safeParseAsync(response.data);

    return validated.data || null;
  } catch(e) {
    const apiError = e as ErrorResponse;
    console.log(apiError);
    return null;
  }
}

export const postBookLoanReservation = async (bookId: number, loanStartDate: string, dueDate: string) => {
  try{
    const api = await getAuthenticatedApi();
    const response : SuccessResponse<Emprestimo> = await api.post(`/books/loans/${bookId}/reservate`, { loanStartDate, dueDate });

    const validated = await EmprestimoSchema.safeParseAsync(response.data);

    return validated.data || null;
  } catch(e) {
    const apiError = e as ErrorResponse;
    console.log(apiError);
    return null;
  }
}

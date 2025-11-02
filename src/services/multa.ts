"use server";

import { getAuthenticatedApi } from "./api";
import { ErrorResponse, SuccessResponse } from "./api";
import { z } from "zod";
import book from "@/services/book";

const MultaSchema = z.object({
    bookLoanId: z.number(),
    bookTitle: z.string(),

    loanDate: z.string(),
    dueDate: z.string(),

    returnDate: z.string().nullable(),

    costPerDay: z.number(),
    payed: z.boolean(),
});

export type Multa = z.infer<typeof MultaSchema>;

export const getMulta = async (
    multaId: number,
): Promise<Multa | null> => {
    try {
        const api = await getAuthenticatedApi();
        const response: SuccessResponse<Multa> = await api.get(
            `/loans/fines/${multaId}`,
        );

        const validation = await MultaSchema.safeParseAsync(response.data,);
        return validation.data || null;
    } catch (e) {
        const apiError = e as ErrorResponse;
        console.log("Erro ao obter multa: ", apiError.message);
        return null;
    }
};

export const postMultaPay = async (
    multaId: number) : Promise<Multa | null> => {
    try {
        const api = await getAuthenticatedApi();
        const response: SuccessResponse<Multa> = await api.post(
            `/loans/fines/${multaId}/pay`,
        );

        const validation = await MultaSchema.safeParseAsync(response.data);
        return validation.data || null;
    } catch (e) {
        console.error("Erro ao pagar multa! ", e);
        return null;
    }
};

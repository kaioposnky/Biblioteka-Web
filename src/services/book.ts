import {ErrorResponse, SuccessResponse, getAuthenticatedApi} from './api';
import {z} from 'zod';
import {Temporal} from "@js-temporal/polyfill";

const toPlainDate = z.string().transform((str) => Temporal.PlainDate.from(str));

const BookSchema = z.object({
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

export type Book = z.infer<typeof BookSchema>;

export const getBook = async (bookId: number): Promise<Book | null> => {
    try{
        const api = await getAuthenticatedApi();
        const response: SuccessResponse<Book> = await api.get(`books/${bookId}`);

        const validated = await BookSchema.safeParseAsync(response.data);

        return validated.data || null;
    } catch (ex){
        const error = ex as ErrorResponse;
        console.log(error);
        return null;
    }
}

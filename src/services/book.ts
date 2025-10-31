import {
  ErrorResponse,
  SuccessResponse,
  getAuthenticatedApi,
  api,
} from "./api";
import { z } from "zod";

const BookSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    authorName: z.string(),
    genreName: z.string(),
    isAvailable: z.boolean(),
  })
  .strip();

type Book = z.infer<typeof BookSchema>;
export default Book;
const BookArraySchema = z.array(BookSchema);

type ResponseDataList = {
  content: Book[];
};

export const getBook = async (bookId: number): Promise<Book | null> => {
  try {
    const api = await getAuthenticatedApi();
    const response: SuccessResponse<Book> = await api.get(`/books/${bookId}`);

    const validated = await BookSchema.safeParseAsync(response.data);

    return validated.data || null;
  } catch (ex) {
    const error = ex as ErrorResponse;
    console.log(error);
    return null;
  }
};

export const getAllBooks = async (): Promise<Book[] | null> => {
  try {
    const response: SuccessResponse<ResponseDataList> = await api.get("/books");

    const validated = await BookArraySchema.safeParseAsync(
      response.data.content,
    );

    return validated.data || null;
  } catch (e) {
    const apiError = e as ErrorResponse;
    console.log(apiError);
    return null;
  }
};

export const getSearchBook = async (title: string, isAvailable: boolean) => {
  try{
    const response : SuccessResponse<ResponseDataList> = await api.get(`/books/search?title=${title}&isAvailable=${isAvailable}`);

    const validated = await BookArraySchema.safeParseAsync(
      response.data.content
    );

    return validated.data || null;
  } catch(e) {
    const apiError = e as ErrorResponse;
    console.log(apiError);
    return null;
  }
}

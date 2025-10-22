import Book, { getBook } from "@/services/book";
import { BookItem } from "@/components/book/BookItem";
import { EmprestimoButton } from "@/components/emprestimo/EmprestimoButton";

export default async function EmprestimoPage({ params }: {
    params: { bookId: string }
}) {
    const {bookId} = await params;
    const numericId = parseInt(bookId);
    const result: Book | null = await getBook(numericId);

    const bookContent = result != null ? (
        <BookItem
            id={numericId}
            title={result.title}
            authorName={result.authorName}
            genreName={result.genreName}
            isAvailable={result.isAvailable}
        />
    ) : (
        <p className={"flex justify-center text-lg"}>
            Livro não encontrado!
        </p>
    );

    return (
        <div className={"flex justify-center w-full"}>
            <div className={"flex flex-col items-center gap-y-10"}>
                <h1 className={"text-3xl font-bold text-emerald-700"}>Confirmação de empréstimo do livro</h1>
                <div className={"flex flex-col items-center gap-y-5"}>
                    {bookContent}
                    {result &&
                        <EmprestimoButton
                            bookId={numericId}
                            isAvailable={result.isAvailable}
                        />
                    }
                </div>
            </div>
        </div>
    );
}
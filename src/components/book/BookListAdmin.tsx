import { BookItem, BookProps } from "@/components/book/BookItem";
import { BookItemAdmin } from "./BookItemAdmin";

interface BookListAdminProps {
    books: BookProps[];
}

export function BookListAdmin({ books }: BookListAdminProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.map((book) => (
                <BookItemAdmin
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    authorName={book.authorName}
                    genreName={book.genreName}
                    isAvailable={book.isAvailable}
                />
            ))}
        </div>
    );
}
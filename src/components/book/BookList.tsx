import { BookItem, BookProps } from "@/components/book/BookItem";

interface BookListProps {
    books: BookProps[];
    canBorrow?: boolean;
}

export function BookList({ books, canBorrow }: BookListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.map((book) => (
                <BookItem
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    authorName={book.authorName}
                    genreName={book.genreName}
                    isAvailable={book.isAvailable}
                    canBorrow={canBorrow}
                />
            ))}
        </div>
    );
}

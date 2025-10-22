import { BookList } from "@/components/book/BookList";
import {getAllBooks} from "@/services/book";
import {BookProps} from "@/components/book/BookItem";

export default async function Biblioteca() {

    const result = await getAllBooks();
    const books : BookProps[] = result?.map(book => {
        return {
            id: book.id,
            title: book.title,
            authorName: book.authorName,
            genreName: book.genreName,
            isAvailable: book.isAvailable,
            canBorrow: true
        };
    }) || [];

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Nossa Biblioteca</h1>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <BookList books={books} canBorrow={true} />
            </div>
        </main>
    );
}
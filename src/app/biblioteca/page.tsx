'use client';
import { BookList } from "@/components/book/BookList";
import { BookProps } from "@/components/book/BookItem";
import { useState } from "react";
import { BookSearch } from "@/components/book/BookSearch";

export default function Biblioteca() {
  const [books, setBooks] = useState<BookProps[]>([]);

  const handleSearchResults = (searchedBooks: BookProps[]) => {
    setBooks(searchedBooks);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Nossa Biblioteca
      </h1>
      <BookSearch onSearch={handleSearchResults} />
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <BookList books={books} canBorrow={true} />
      </div>
    </main>
  );
}

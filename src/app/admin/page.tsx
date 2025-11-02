"use client"

import CreateBookForm from "@/components/admin/CreateBookForm";
import { BookProps } from "@/components/book/BookItem";
import { BookListAdmin } from "@/components/book/BookListAdmin";
import { BookSearch } from "@/components/book/BookSearch";
import { useState, useCallback } from "react";
import toaster from "react-hot-toast";

export default function AdminPageScreen(){
  const [books, setBooks] = useState<BookProps[]>([]);

  const handleBookCreated = () => {
    toaster.success("Livro criado com sucesso!");
  }

  const handleSearchResults = useCallback((searchedBooks: BookProps[]) => {
    setBooks(searchedBooks);
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
      Página do Administrador
    </h1>
    <CreateBookForm onBookCreated={handleBookCreated} />
    <BookSearch onSearch={handleSearchResults}/>
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <BookListAdmin books={books} />
    </div>
  </main>)

}

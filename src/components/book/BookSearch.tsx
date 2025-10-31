"use client";
import { useState, useEffect } from "react";
import Book, { getSearchBook } from "@/services/book";
import TextInput from "@/components/ui/form/text-input";
import { BookProps } from "@/components/book/BookItem";

interface BookSearchProps {
  onSearch: (books: BookProps[]) => void;
}

export function BookSearch({ onSearch }: BookSearchProps) {
  const [title, setTitle] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const handleSearch = async () => {
        const result: Book[] | null = await getSearchBook(title, isAvailable);
        const formattedBooks: BookProps[] =
          result?.map((book) => {
            return {
              id: book.id,
              title: book.title,
              authorName: book.authorName,
              genreName: book.genreName,
              isAvailable: book.isAvailable,
              canBorrow: true,
            };
          }) || [];
        onSearch(formattedBooks);
      };
      handleSearch();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [title, isAvailable, onSearch]);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <TextInput
          label="Titulo do Livro"
          name="search"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Buscar por título..."
          className="w-full md:w-3/4"
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isAvailable"
            name="isAvailable"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="isAvailable"
            className="ml-2 block text-sm text-gray-900"
          >
            Disponível
          </label>
        </div>
      </div>
    </div>
  );
}

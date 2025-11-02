'use client';

import { useState } from 'react';
import { postCreateBook } from '@/services/book';
import TextInput from '@/components/ui/form/text-input';

interface CreateBookFormProps {
  onBookCreated: () => void;
}

export default function CreateBookForm({ onBookCreated }: CreateBookFormProps) {
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [genreName, setGenreName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title || !authorName || !genreName) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    const result = await postCreateBook(title, authorName, genreName);

    if (result) {
      setSuccess('Livro criado com sucesso!');
      setTitle('');
      setAuthorName('');
      setGenreName('');
      onBookCreated();
    } else {
      setError('Falha ao criar o livro. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Adicionar Novo Livro</h2>
      <form onSubmit={handleSubmit} action="#" className="flex flex-col gap-4">
        <TextInput
          label="Título"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título do livro"
          required
        />
        <TextInput
          label="Autor"
          name="authorName"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Nome do autor"
          required
        />
        <TextInput
          label="Gênero"
          name="genreName"
          value={genreName}
          onChange={(e) => setGenreName(e.target.value)}
          placeholder="Gênero do livro"
          required
        />
        <button type="submit" className="bg-cyan-600 text-white p-2 rounded-lg hover:bg-cyan-700 transition-colors">
          Adicionar Livro
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </form>
    </div>
  );
}

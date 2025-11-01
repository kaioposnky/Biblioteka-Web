'use client';

import { useState } from 'react';
import { putUpdateUser } from '@/services/auth';
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";


export default function Profile() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [password, setPassword] = useState('');

    if (user === undefined) {
        return null;
    }

    const handleSave = async () => {
        if (name === '' || name.length < 2) {
            toast.error("Seu nome deve ter pelo menos 2 caracteres.");
            return;
        } else if (password !== '' && password.length < 8) {
            toast.error("Sua senha deve ter pelo menos 8 caracteres.");
            return;
        }

        setIsLoading(true);
        try {
            await putUpdateUser(name, password);
            toast.success("Informações atualizadas com sucesso!");
            setIsEditing(false);
        } catch (err) {
            toast.error("Ocorreu um erro ao atualizar suas informações!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">Meu Perfil</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Nome</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!isEditing || isLoading}
                        className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-75"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">Nova Senha (deixe em branco para não alterar)</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={!isEditing || isLoading}
                        className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-75"
                    />
                </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="px-4 py-2 font-bold text-white bg-emerald-600 rounded-md hover:bg-emerald-700 disabled:bg-gray-400"
                        >
                            {isLoading ? 'Salvando...' : 'Salvar'}
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            disabled={isLoading}
                            className="px-4 py-2 font-bold text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                            Cancelar
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 font-bold text-white bg-cyan-600 rounded-md hover:bg-cyan-700"
                    >
                        Editar Perfil
                    </button>
                )}
            </div>
        </div>
    );
}

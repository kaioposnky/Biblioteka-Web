import React from "react";
import {checkSession} from "@/lib/session";

export default async function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    // Garante que qualquer um que acesse essa parte do site esteja autenticado
    await checkSession();

    return (
        <div>
            {children}
        </div>
    );
}
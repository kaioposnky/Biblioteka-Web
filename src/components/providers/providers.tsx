'use client';

import {SessionProvider} from "next-auth/react";
import React from "react";

// Esse component existe para passar o Session como client para as outras páginas, para evitar erros de session on server component
export default function Providers({children}: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}

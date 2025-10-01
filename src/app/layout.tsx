import "./globals.css";
import {Header} from "@/components/header";
import Footer from "@/components/footer";
import {Toaster} from "react-hot-toast";
import Providers from "@/components/providers/providers";
import React from "react";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
        <body
            className={`antialiased`}
        >
        <Providers>
            <Header/>
            {children}
            <Footer/>
        </Providers>

        <Toaster
            position="bottom-right"
            toastOptions={{
                duration: 3000,
                style: {
                    background: "#363636",
                    color: "#fff",
                    fontSize: "large",
                },
                success: {
                    duration: 3000,
                    iconTheme: {
                        primary: '#00ff21',
                        secondary: '#fff',
                    },
                },
                error: {
                    duration: 5000,
                    iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                    },
                },
                loading: {
                    iconTheme: {
                        primary: '#9b9bb1',
                        secondary: '#fff',
                    },
                },
            }}
        />
        </body>
        </html>
    );
}
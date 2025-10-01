import {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {auth} from "@/services/auth";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }
                const user = await auth.login(credentials);

                if (user) {
                    return user;
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: '/auth/login',
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = Number(user.id);
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as number;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
    },
    secret: process.env.AUTH_SECRET,
}
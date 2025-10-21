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
                const userFromBackend = await auth.login(credentials);

                if (userFromBackend) {
                    return {
                        ...userFromBackend,
                        accessToken: userFromBackend.jwtToken,
                    };
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
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token }) {
          if (session.user && token.id) {
            session.user.id = token.id as number;
            session.user.email = token.email;
            session.user.name = token.name;
            session.user.accessToken = token.accessToken;
          }
          return session;
        },
    },
    secret: process.env.AUTH_SECRET,
}
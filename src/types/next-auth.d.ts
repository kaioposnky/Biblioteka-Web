import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      accessToken: string;
    } & DefaultSession["user"];
  }


  interface User extends DefaultUser {
    id: number;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: number;
    accessToken: string;
  }
}
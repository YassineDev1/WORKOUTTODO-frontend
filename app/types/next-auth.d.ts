import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"


declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
     user?:
    | {
        accessToken?: string | null | undefined;
        refreshToke?: string | null | undefined;
        tokenExpiresIn?: number | null | undefined;
        data?:
          | {
              email?: string | null | undefined;
              name?: string | null | undefined;
              image?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
    status: string
  }
}


declare module "next-auth/jwt" {

  interface JWT {
    accessToken?: string
  }
}
import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
     user?:
    | {
        accessToken?: string | null | undefined;
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
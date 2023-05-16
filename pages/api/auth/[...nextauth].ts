import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        //
        try {
          const res = await axios.post(
            "http://127.0.0.1:5000/api/users/login",
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );
          const user =  res?.data;

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
});

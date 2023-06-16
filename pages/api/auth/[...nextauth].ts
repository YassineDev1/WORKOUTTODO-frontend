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
        try {
          const res = await axios.post(
            `${process.env.API_URI}/api/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );
          const user = res?.data;
          if (user) {
            user.accessToken = user.accessToken || null;
            user.refreshToken = user.refreshToken || null;
            user.tokenExpiresIn = user.tokenExpiresIn || null;
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
    async jwt({ token, user }: any) {
      const isAccessTokenExpired = token && Date.now() > token.exp * 1000;

      if (isAccessTokenExpired && user?.refreshToken) {
        try {
          const res = await axios.post(
            `${process.env.API_URI}/api/refresh-token`,
            {
              refreshToken: user.refreshToken,
            }
          );
          token.accessToken = res?.data.accessToken;
          token.exp = res?.data.tokenExpiresIn; // Update the token expiration time
        } catch (err) {
          console.log(err);
        }
      }

      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
});

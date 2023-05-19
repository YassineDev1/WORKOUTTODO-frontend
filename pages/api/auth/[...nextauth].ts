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
            "http://127.0.0.1:5000/api/users/login",
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );
          const user = res?.data;
          if (user) {
            user.accessToken = user.accessToken || null;
            user.refreshToken = user.refreshToken || null;
            user.tokenExpiresIn = res?.data.tokenExpiresIn || null;
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
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      const isAccessTokenExpired = token && Date.now() > token.exp * 1000;

      if (isAccessTokenExpired && user?.refreshToken) {
        try {
          const res = await axios.post(
            "http://127.0.0.1:5000/api/users/refresh-token",
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
    async session({ session, token, user }) {
      session.user = token;
      session.expires = token.expires;
      return session;
    },
  },
});

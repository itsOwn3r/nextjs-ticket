import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { createHmac } from "crypto";

const prisma: PrismaClient = new PrismaClient();
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: "Email",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
      const hash = createHmac('sha256', process.env.SECRET!)  // Make sure that SECRET exist on .env file!
                         .update(credentials!.password)
                         .digest('hex');
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (user === null) {
          return null;
        }
        const authUser = credentials.email === user!.email && hash == user!.password
        if (!authUser) {
          return null
        } else {

         return {
          id: user.id,
          email: user.email,
          name: user.name,
          type: user.type,
          avatar: user.avatar,
         };
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn:"/login"
  },
  session: {
    strategy: "jwt",
  }, callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return url
    },
    async session({ session, user, token }) {
      if (token.avatar) {
        session!.user!.avatar = token.avatar as string,
        session!.user!.type = token.type as string
      }
      return session
    },
    async jwt({ token, user,account , session, profile, isNewUser, trigger }) {
      if (trigger === "update" ) {
        token.avatar = session.avatar
      }
      if (user) {
        token.avatar = user.avatar,
        token.type = user.type
      }
      return token
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

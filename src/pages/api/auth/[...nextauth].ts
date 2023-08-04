import NextAuth, { User } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { Session } from "next-auth/core/types";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

import { authenticateUser } from "src/utils/authentication";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        return await authenticateUser(credentials.email, credentials.password);
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user?: User }) => {
      if (user?.email) {
        return { ...token, ...user };
      }

      return token;
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (!token.accountId) {
        throw new Error(
          "Session callback: Stripe account ID is missing in the token",
        );
      }

      if (!token.requiresOnboarding === undefined) {
        throw new Error(
          "Session callback: requiresOnboarding field is missing in the token",
        );
      }

      session.accountId = token.accountId;
      session.requiresOnboarding = token.requiresOnboarding;
      session.businessName = token.businessName;

      return session;
    },
  },
};

export default NextAuth(authOptions);
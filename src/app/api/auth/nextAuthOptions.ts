import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt";

// Define the User interface
interface UserType {
  _id: string;
  email: string;
  username: string;
  password: string;
}

// Extend the DefaultSession to include custom properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
    };
  }

  interface User {
    id: string;
    username: string;
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        await dbConnect();
        try {
          const user = (await User.findOne({
            email: credentials.email,
          })) as UserType | null;

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return {
                id: user._id.toString(),
                email: user.email,
                username: user.username,
              };
            } else {
              throw new Error("Incorrect password");
            }
          } else {
            throw new Error("No user found with this email");
          }
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/lessons",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
};

export default authOptions;

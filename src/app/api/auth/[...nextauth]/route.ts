import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt"; // Correct import for JWT
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt";

// Define the User interface
interface UserType {
  _id: string;
  email: string;
  username: string;
  password: string; // Include this if you need to access it
}

// Extend the DefaultSession to include custom properties
interface Session extends DefaultSession {
  user: {
    id: string;
    username: string;
  } & DefaultSession["user"]; // Ensure to merge with DefaultSession user
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
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
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: { id: string; username: string };
    }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id as string; // Ensure type assertion
        session.user.username = token.username as string; // Ensure type assertion
      }
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, handler as PUT, handler as DELETE };

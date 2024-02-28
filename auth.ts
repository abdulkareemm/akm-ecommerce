import { SignInCredentials } from "@/app/types";
import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const authConfig = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, request) {
        const { email, password } = credentials as SignInCredentials;
        try {
          const response = await axios.post(
            "http://localhost:3000/api/users/signin",
            { email, password }
          );
          return { response };
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);

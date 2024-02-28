import { SignInCredentials } from "@/app/types";
import axios from "axios";
import NextAuth from "next-auth";
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
  handlers: { GET, POST },
  auth,
} = NextAuth(authConfig);

import { loginFormValidationSchema } from '@/pages/login';
import { Contributor } from '@/types/contributor';
import { contributorsCollectionRef } from '@firebase/collections';
import { compareSync } from 'bcryptjs';
import { doc, getDoc } from 'firebase/firestore';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      async authorize(credentials) {
        try {
          const loginInputs = loginFormValidationSchema.safeParse(credentials);
          if (!loginInputs.success) {
            throw new Error(
              JSON.stringify({
                message: 'Please provide a valid username and password',
                status: 400,
              })
            );
          }

          const contributorSnap = await getDoc(doc(contributorsCollectionRef, loginInputs.data.username));
          if (!contributorSnap.exists) return null;

          const contributorInfo = contributorSnap.data() as Omit<Contributor, 'username'>;
          const isPasswordMatch = compareSync(loginInputs.data.password, contributorInfo.password as string);
          if (!isPasswordMatch) return null;

          return {
            id: loginInputs.data.username,
            username: loginInputs.data.username,
            avatarUrl: contributorInfo.avatarUrl,
          };
        } catch (error) {
          return null;
        }
      },
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Eg: rwlanup' },
        password: { label: 'Password', type: 'password' },
      },
      type: 'credentials',
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);

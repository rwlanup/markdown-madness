/* eslint-disable no-unused-vars */
import { Contributor } from './contributor';

declare module 'next-auth' {
  interface Session {
    user: Pick<Contributor, 'avatarUrl' | 'username'>;
  }

  interface User extends Pick<Contributor, 'avatarUrl' | 'username'> {}
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: Pick<Contributor, 'avatarUrl' | 'username'>;
  }
}

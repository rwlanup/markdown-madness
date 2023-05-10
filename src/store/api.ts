import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { FirebaseError } from 'firebase/app';

const firebaseBaseQuery =
  (): BaseQueryFn<
    {
      fn: () => unknown;
    },
    unknown,
    { status: number; message: string }
  > =>
  async ({ fn }) => {
    try {
      let data = await fn();
      return {
        data,
      };
    } catch (error) {
      if (error instanceof FirebaseError) {
        return {
          error: {
            status: 500,
            message: error.message,
          },
        };
      } else {
        return {
          error: {
            status: 500,
            message: 'Something went wrong, please try again later.',
          },
        };
      }
    }
  };
export const api = createApi({
  baseQuery: firebaseBaseQuery(),
  endpoints: () => ({}),
});

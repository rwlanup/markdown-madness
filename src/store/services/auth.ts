import { LoginInputs } from '@/pages/login';
import { api } from '../api';
import { collection, doc, getDoc } from 'firebase/firestore';
import { firestore } from '@firebase/index';
import { compareSync } from 'bcryptjs';
import { Contributor } from '@/types/contributor';
import { deleteAuthFromStorage, setAuthInStorage } from '@/helper/storage';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const contributorsRef = collection(firestore, 'contributors');

const authInitialState: { user: Contributor | null } = { user: null };
export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setAuth: (state, { payload: auth }: PayloadAction<Contributor>) => {
      setAuthInStorage(auth.username, auth.password as string);
      state.user = auth;
    },
    removeAuth: (state) => {
      deleteAuthFromStorage();
      state.user = null;
    },
  },
});

export const { removeAuth, setAuth } = authSlice.actions;

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Contributor, LoginInputs>({
      query: ({ username, password }) => ({
        async fn() {
          const contributorSnap = await getDoc(doc(contributorsRef, username));
          if (!contributorSnap.exists) {
            throw new Error('Your username and/or password does not match any account.');
          }
          const contributorInfo = contributorSnap.data() as Omit<Contributor, 'username'>;
          const isPasswordMatch =
            compareSync(password, contributorInfo.password as string) || password === contributorInfo.password;
          if (!isPasswordMatch) {
            throw new Error('Your username and/or password does not match any account.');
          }
          return {
            ...contributorInfo,
            username,
          };
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuth(data));
        } catch (error) {
          console.log(error);
          dispatch(removeAuth());
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation } = authApi;

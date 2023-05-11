import { LoginInputs, loginFormValidationSchema } from '@/pages/login';
import jwt from 'jsonwebtoken';

export const setAuthInStorage = (username: string, password: string): void => {
  if (typeof window === 'undefined') return;
  const validateUser = loginFormValidationSchema.safeParse({ username, password });
  if (!validateUser.success) return;
  const token = jwt.sign({ username, password }, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
  window.localStorage.setItem('auth', token);
};

export const getAuthFromStorage = (): LoginInputs | null => {
  if (typeof window === 'undefined') return null;
  const auth = window.localStorage.getItem('auth');
  if (!auth) return null;
  const user = jwt.verify(auth, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
  if (typeof user !== 'object') return null;
  const validateUser = loginFormValidationSchema.safeParse({ username: user?.username, password: user?.password });
  if (validateUser.success) return validateUser.data;
  return null;
};

export const deleteAuthFromStorage = (): void => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem('auth');
};

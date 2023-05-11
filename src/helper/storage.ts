import { LoginInputs, loginFormValidationSchema } from '@/pages/login';
import jwt from 'jsonwebtoken';

export const setAuthInStorage = (username: string, password: string): void => {
  const validateUser = loginFormValidationSchema.safeParse({ username, password });
  if (!validateUser.success) return;
  const token = jwt.sign({ username, password }, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
  localStorage.setItem('auth', token);
};

export const getAuthFromStorage = (): LoginInputs | null => {
  const auth = localStorage.getItem('auth');
  if (!auth) return null;
  const user = jwt.verify(auth, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
  if (typeof user !== 'object') return null;
  const validateUser = loginFormValidationSchema.safeParse({ username: user?.username, password: user?.password });
  if (validateUser.success) return validateUser.data;
  return null;
};

export const deleteAuthFromStorage = (): void => {
  localStorage.removeItem('auth');
};

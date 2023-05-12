import { Box, Grid, Typography, Link } from '@mui/material';
import Head from 'next/head';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledTextField from '@/components/input/controlled-text-field';
import { LoadingButton } from '@mui/lab';
import { signIn } from 'next-auth/react';
import useAuthUser from '@/hooks/useAuthUser';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';

function LoginMetaData() {
  return (
    <Head>
      <title>Markdown Madness - Login</title>
      <meta
        name="description"
        content="Join Markdown Madness and start contributing your best memes, jokes and other markdown content to earn points, and challenge other players to compete for the top spot on the leaderboard."
      />
    </Head>
  );
}

export const loginFormValidationSchema = z.object({
  username: z.string().min(1, 'Please enter your username'),
  password: z
    .string()
    .min(
      1,
      'Please enter your password, if you are contributor and have not changed your password then re-enter username'
    ),
});

export type LoginInputs = z.infer<typeof loginFormValidationSchema>;

function LoginForm() {
  const { isFetching, sessionStatus } = useAuthUser({
    onError(err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    },
  });

  const { control, handleSubmit } = useForm<LoginInputs>({
    resolver: zodResolver(loginFormValidationSchema),
    defaultValues: {
      password: '',
      username: '',
    },
  });
  const [isSigningIn, setIsSigningIn] = useState(false);
  const onSubmit = async (data: LoginInputs) => {
    setIsSigningIn(true);
    const result = await signIn('credentials', { redirect: false, callbackUrl: '/', ...data });
    if (result?.error) {
      enqueueSnackbar('Your username and/or password does not match', { variant: 'error' });
    }
    setIsSigningIn(false);
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={2.5}>
        <Grid item>
          <ControlledTextField label="Username" placeholder="Eg: johndoe" name="username" control={control} />
        </Grid>
        <Grid item>
          <ControlledTextField label="Password" name="password" type="password" control={control} />
        </Grid>
        <Grid item>
          <LoadingButton
            loading={isFetching || sessionStatus === 'loading' || isSigningIn}
            type="submit"
            variant="contained"
            size="large"
            sx={{ borderRadius: '8px' }}
          >
            Log in to your account
          </LoadingButton>
          <Typography sx={{ mt: 2 }} component="p" variant="body2" fontWeight="Medium">
            <Link href="/">Don&apos;t have an account? Learn to create new account</Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default function LoginPage() {
  return (
    <Box component="main" sx={{ py: { sm: 3 } }}>
      <LoginMetaData />
      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          mx: 'auto',
          maxWidth: 'sm',
          bgcolor: 'common.white',
          border: { sm: 1 },
          borderColor: { sm: 'divider' },
          borderRadius: { sm: 1 },
        }}
      >
        <Typography fontWeight="Bold" sx={{ mb: 3 }} variant="h3" component="h1">
          Login to your account
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
}

LoginPage.auth = false;

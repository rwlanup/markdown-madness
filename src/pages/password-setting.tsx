import ControlledTextField from '@/components/input/controlled-text-field';
import useAuthUser from '@/hooks/useAuthUser';
import { Contributor } from '@/types/contributor';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Box, Grid, Typography } from '@mui/material';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { hashSync } from 'bcryptjs';
import type { DocumentReference, WithFieldValue } from 'firebase/firestore';
import Head from 'next/head';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function PasswordSettingMetaData() {
  return (
    <Head>
      <title>Password Setting - Change Your Password | Markdown Madness</title>
      <meta
        name="description"
        content="Keep your account secure on Markdown Madness by updating your password on the password setting page. Create a strong and secure password for added protection."
      />
    </Head>
  );
}

const passwordSettingValidationSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, 'Please enter your new password')
      .min(8, 'Password must be at least 8 characters long'),
    confirmNewPassword: z.string().min(1, 'Please re-enter your new password'),
  })
  .refine(({ confirmNewPassword, newPassword }) => confirmNewPassword === newPassword, {
    path: ['confirmNewPassword'],
    message: 'Your confirmation password does not match',
  });

export type PasswordSettingInputs = z.infer<typeof passwordSettingValidationSchema>;

function PasswordSettingForm() {
  const { control, handleSubmit, reset } = useForm<PasswordSettingInputs>({
    resolver: zodResolver(passwordSettingValidationSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const { data: userDoc, refetch } = useAuthUser();
  const { mutate, isLoading } = useFirestoreDocumentMutation<Contributor>(
    userDoc?.ref as DocumentReference<Contributor>,
    {
      merge: true,
    },
    {
      onSuccess() {
        enqueueSnackbar('Your password has been updated successfully', { variant: 'success' });
        reset();
        refetch();
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      },
    }
  );
  const onSubmit = async (inputs: PasswordSettingInputs) => {
    if (userDoc) {
      const newHashedPassword = hashSync(inputs.newPassword, 10);
      mutate({
        password: newHashedPassword,
        hasChangedPassword: true,
      } as WithFieldValue<Contributor>);
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={2.5}>
        <Grid item>
          <ControlledTextField label="New password" name="newPassword" type="password" control={control} />
        </Grid>
        <Grid item>
          <ControlledTextField
            label="Re-type new password"
            name="confirmNewPassword"
            type="password"
            control={control}
          />
        </Grid>
        <Grid item>
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            size="large"
            sx={{ borderRadius: '8px' }}
          >
            Update password
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default function PasswordSettingPage() {
  return (
    <Box component="main" sx={{ py: { sm: 3 } }}>
      <PasswordSettingMetaData />
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
          Change your password
        </Typography>
        <PasswordSettingForm />
      </Box>
    </Box>
  );
}

PasswordSettingPage.auth = true;

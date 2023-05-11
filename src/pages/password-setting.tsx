import ControlledTextField from '@/components/input/controlled-text-field';
import useAppSelector from '@/hooks/useAppSelector';
import { useUpdatePasswordMutation } from '@/store/services/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Grid, Typography } from '@mui/material';
import Head from 'next/head';
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
    currentPassword: z.string().min(1, 'Please enter your current password'),
    newPassword: z
      .string()
      .min(1, 'Please enter your new password')
      .min(8, 'Password must be at least 8 characters long'),
    confirmNewPassword: z.string().min(1, 'Please re-enter your new password'),
  })
  .refine(({ confirmNewPassword, newPassword }) => confirmNewPassword === newPassword, {
    path: ['confirmNewPassword'],
    message: 'Your confirmation password does not match',
  })
  .refine(({ newPassword, currentPassword }) => currentPassword !== newPassword, {
    path: ['newPassword'],
    message: 'New password cannot be same as current password',
  });

export type PasswordSettingInputs = z.infer<typeof passwordSettingValidationSchema>;

function PasswordSettingForm() {
  const { control, handleSubmit, reset } = useForm<PasswordSettingInputs>({
    resolver: zodResolver(passwordSettingValidationSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });
  const [updatePassword, { isError, error, isLoading, isSuccess, data }] = useUpdatePasswordMutation();
  const username = useAppSelector((state) => state.auth.user?.username);
  const onSubmit = async (inputs: PasswordSettingInputs) => {
    if (username) {
      const result = await updatePassword({
        username,
        newPassword: inputs.newPassword,
      });
      if ('data' in result) {
        reset();
      }
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={2.5}>
        {isError && !!error && (
          <Grid item>
            <Alert severity="error">{error.message}</Alert>
          </Grid>
        )}
        {isSuccess && !!data && (
          <Grid item>
            <Alert severity="success">{data}</Alert>
          </Grid>
        )}
        <Grid item>
          <ControlledTextField label="Current password" name="currentPassword" type="password" control={control} />
        </Grid>
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

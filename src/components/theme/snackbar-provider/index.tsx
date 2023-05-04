import { Alert } from '@mui/material';
import { SnackbarProvider, SnackbarProviderProps, CustomContentProps, closeSnackbar, SnackbarOrigin } from 'notistack';
import { forwardRef } from 'react';

const SnackbarAlert = forwardRef<HTMLDivElement, CustomContentProps>(function SnackbarAlert(props, ref) {
  const severity = props.variant === 'default' ? 'info' : props.variant;
  const action = typeof props.action === 'function' ? props.action(props.id) : props.action;

  const onClose = () => closeSnackbar(props.id);
  return (
    <Alert ref={ref} elevation={6} variant="filled" severity={severity} action={action} onClose={onClose}>
      {props.message}
    </Alert>
  );
});

const snackbarOrigin: SnackbarOrigin = {
  horizontal: 'center',
  vertical: 'bottom',
};

const SnackbarProviderComponents: SnackbarProviderProps['Components'] = {
  default: SnackbarAlert,
  error: SnackbarAlert,
  info: SnackbarAlert,
  success: SnackbarAlert,
  warning: SnackbarAlert,
};

export default function AppSnackbarProvider() {
  return <SnackbarProvider anchorOrigin={snackbarOrigin} maxSnack={3} Components={SnackbarProviderComponents} />;
}

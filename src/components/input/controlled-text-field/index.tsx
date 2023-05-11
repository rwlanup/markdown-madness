import { TextField, TextFieldProps } from '@mui/material';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';

type ControlledTextFieldProps<FormValues extends FieldValues> = UseControllerProps<FormValues> &
  Omit<TextFieldProps, 'onChange'>;

export default function ControlledTextField<FormValues extends FieldValues>({
  name,
  control,
  rules,
  shouldUnregister,
  defaultValue,
  ...TextFieldProps
}: ControlledTextFieldProps<FormValues>) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return (
    <TextField
      {...TextFieldProps}
      onChange={field.onChange}
      onBlur={field.onBlur}
      // To disable autofill for browsers
      autoComplete="new-password"
      name={name}
      value={field.value}
      inputRef={field.ref}
      error={invalid}
      helperText={error?.message ?? TextFieldProps.helperText}
    />
  );
}

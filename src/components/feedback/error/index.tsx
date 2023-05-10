import { Box, Typography } from '@mui/material';

export default function ErrorScreen({
  title = 'Something went wrong',
  message = 'Sorry, an unknown error has occurred. Please try again later or contact the website administrator for assistance.',
}: {
  title?: string;
  message?: string;
}) {
  return (
    <Box component="main" sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography color="error.main" component="h1" fontWeight="Bold" variant="h3" align="center">
        Oops,
        <br /> {title}
      </Typography>
      <Typography sx={{ mt: 2, maxWidth: '560px' }} color="text.secondary" align="center">
        {message}
      </Typography>
    </Box>
  );
}

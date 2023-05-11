import { Card, CardHeader, CardContent, CardActions, Skeleton, Stack } from '@mui/material';

export default function MadnessContentSkeleton() {
  return (
    <Card elevation={0} variant="outlined" sx={{ maxWidth: 'md', mx: 'auto', borderRadius: { xs: 0, sm: 1 } }}>
      <CardHeader
        avatar={<Skeleton variant="circular" height={40} width={40} />}
        title={<Skeleton height={20} width={180} />}
        subheader={<Skeleton height={20} width={220} />}
      />
      <CardContent
        sx={{
          borderTop: 1,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Stack spacing={1}>
          <Skeleton height={24} width="80%" />
          <Skeleton height={20} width="100%" />
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <Skeleton variant="rounded" height={36} width={160} />
        <Skeleton height={20} width={68} />
      </CardActions>
    </Card>
  );
}

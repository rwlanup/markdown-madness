import { Card, CardActions, CardContent, Skeleton } from '@mui/material';

export default function StoreItemSkeleton() {
  return (
    <Card elevation={5} sx={{ borderRadius: 0.5, whiteSpace: 'nowrap', minWidth: '320px' }}>
      <CardContent sx={{ borderBottom: 1, borderBottomColor: 'divider', display: 'flex', gap: '16px' }}>
        <Skeleton variant="rectangular" width="100%" height={92} />
      </CardContent>
      <CardActions>
        <Skeleton variant="rounded" width="100%" height={40} />
      </CardActions>
    </Card>
  );
}

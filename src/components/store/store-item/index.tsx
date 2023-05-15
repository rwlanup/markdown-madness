import { LoadingButton } from '@mui/lab';
import { Box, Typography, Card, CardActions, CardContent } from '@mui/material';
import Image from 'next/image';
import PoliceImage from '@images/police.png';
import ThiefImage from '@images/thief.png';
import { StoreItem as TStoreItem } from '@/types/store';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import useBuyStoreItem from '@/hooks/useBuyStoreItem';

const IMAGE_SIZE = 48;

function StoreItemCard({ type, count }: { type: 'Police' | 'Thief'; count: number }) {
  return (
    <Box
      sx={{
        flex: '1',
        bgcolor: type === 'Police' ? 'primary.50' : 'secondary.50',
        borderRadius: 0.25,
        p: 1,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {type}
      </Typography>
      <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Image
          src={type === 'Police' ? PoliceImage : ThiefImage}
          height={IMAGE_SIZE}
          width={IMAGE_SIZE}
          alt={`Illustration of ${type === 'Police' ? 'policeman' : 'thief'}`}
        />
        <Typography variant="h4" component="span" fontWeight="Bold">
          {count}
        </Typography>
      </Box>
    </Box>
  );
}
export default function StoreItem({ snap }: { snap: QueryDocumentSnapshot<TStoreItem> }) {
  const data = snap.data();
  const mutation = useBuyStoreItem(snap.id);
  return (
    <Card elevation={5} sx={{ borderRadius: 0.5, whiteSpace: 'nowrap', minWidth: '320px' }}>
      <CardContent sx={{ borderBottom: 1, borderBottomColor: 'divider', display: 'flex', gap: '16px' }}>
        {data.policeCount > 0 && <StoreItemCard type="Police" count={data.policeCount} />}
        {data.thiefCount > 0 && <StoreItemCard type="Thief" count={data.thiefCount} />}
      </CardContent>
      <CardActions>
        <LoadingButton onClick={() => mutation.mutate()} loading={mutation.isLoading} fullWidth variant="outlined">
          Buy @ {data.points} points
        </LoadingButton>
      </CardActions>
    </Card>
  );
}

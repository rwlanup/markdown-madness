import { Box, Grid, Typography } from '@mui/material';
import { StoreItem as TStoreItem } from '@/types/store';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { orderBy, query } from 'firebase/firestore';
import { storeCollectionRef } from '@firebase/collections';
import ErrorScreen from '@/components/feedback/error';
import StoreItemSkeleton from '@/components/store/store-item/StoreItemSkeleton';
import StoreItem from '@/components/store/store-item';

const storeQuery = query<TStoreItem>(storeCollectionRef, orderBy('points', 'asc'));

export default function StorePage() {
  const { data, isLoading, isError, error } = useFirestoreQuery<TStoreItem>('store', storeQuery);

  return (
    <>
      {isError ? (
        <ErrorScreen title={error.message} />
      ) : (
        <Box component="main" sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography sx={{ mb: 3 }} fontWeight="Bold" component="h1" variant="h4">
            Buy items from store
          </Typography>
          <Grid container spacing={2.5}>
            {isLoading || !data
              ? Array(3)
                  .fill('')
                  .map((_, idx) => (
                    <Grid item xs="auto" key={idx}>
                      <StoreItemSkeleton />
                    </Grid>
                  ))
              : data.docs.map((doc) => (
                  <Grid item xs="auto" key={doc.id}>
                    <StoreItem snap={doc} />
                  </Grid>
                ))}
          </Grid>
        </Box>
      )}
    </>
  );
}

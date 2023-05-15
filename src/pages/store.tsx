import { Box, Grid, Typography } from '@mui/material';
import { StoreItem as TStoreItem } from '@/types/store';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { orderBy, query } from 'firebase/firestore';
import { storeCollectionRef } from '@firebase/collections';
import ErrorScreen from '@/components/feedback/error';
import StoreItemSkeleton from '@/components/store/store-item/StoreItemSkeleton';
import StoreItem from '@/components/store/store-item';
import Head from 'next/head';

const storeQuery = query<TStoreItem>(storeCollectionRef, orderBy('points', 'asc'));

function StoreMetaData() {
  return (
    <Head>
      <title>Buy Police and Thief | Markdown Madness</title>
      <meta
        name="description"
        content="Safeguard valuable contents or rob others contents points. Navigate intricate challenges, outmaneuver opponents, and embrace the thrill of calculated risk. Step into a world where fortunes hang in the balance - get your copy of Polices and Thieves today!"
      />
    </Head>
  );
}

export default function StorePage() {
  const { data, isLoading, isError, error } = useFirestoreQuery<TStoreItem>('store', storeQuery);

  return (
    <>
      <StoreMetaData />
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

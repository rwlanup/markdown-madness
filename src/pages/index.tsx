import MadnessContent from '@/components/madness/madness-content';
import { Box, Divider, Typography } from '@mui/material';
import Head from 'next/head';
import { useContentsListQuery } from '@/store/services/content';
import { LoadingButton } from '@mui/lab';
import ErrorScreen from '@/components/feedback/error';
import MadnessContentSkeleton from '@/components/madness/madness-content/MadnessContentSkeleton';

function HomeMetaData() {
  return (
    <Head>
      <title>MarkDown Madness - Share, Express Yourself and Level Up!</title>
      <meta
        name="description"
        content="MarkDown Madness is a game for code contributors to create markdown posts. Earn points, unlock new features, and collaborate with others. Have fun and be creative!"
      />
    </Head>
  );
}

export default function Home() {
  const { data, isLoading, isFetching, error, isError, refetch } = useContentsListQuery();
  const onLoadMoreHandler = () => {
    if (data?.canLoadMore) {
      refetch();
    }
  };
  return (
    <>
      <HomeMetaData />
      {isError && !data ? (
        <ErrorScreen title={error?.message} />
      ) : (
        <Box component="main" sx={{ p: { xs: 0, sm: 3 } }}>
          {isLoading || !data ? (
            <MadnessContentSkeleton />
          ) : (
            data.contents.map((content) => (
              <Box key={content.id}>
                <MadnessContent content={content} />
                <Divider sx={{ my: { xs: 2, sm: 3 }, mx: { sm: -3 } }} />
              </Box>
            ))
          )}

          {!!data && (
            <Box sx={{ textAlign: 'center' }}>
              {data?.canLoadMore ? (
                <LoadingButton onClick={onLoadMoreHandler} loading={isFetching} variant="contained" size="large">
                  Load more
                </LoadingButton>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No more contents
                </Typography>
              )}
            </Box>
          )}

          {!!data && data.contents.length > 0 && isError && (
            <Typography align="center" variant="body2" color="error.main">
              {error?.message}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
}

import MadnessContent from '@/components/madness/madness-content';
import { Box, Divider, Typography } from '@mui/material';
import Head from 'next/head';
import { LoadingButton } from '@mui/lab';
import ErrorScreen from '@/components/feedback/error';
import MadnessContentSkeleton from '@/components/madness/madness-content/MadnessContentSkeleton';
import { contentsCollectionRef } from '@firebase/collections';
import { DocumentSnapshot, limit, orderBy, query, startAfter } from 'firebase/firestore';
import { useFirestoreInfiniteQuery } from '@react-query-firebase/firestore';
import { MadnessContent as TMadnessContent } from '@/types/madness';
import React from 'react';

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

export const MADNESS_CONTENTS_LIMIT = 20;
const contentsQuery = (snapshot?: DocumentSnapshot) =>
  query<TMadnessContent>(
    contentsCollectionRef,
    orderBy('createdAt', 'desc'),
    startAfter(snapshot ?? []),
    limit(MADNESS_CONTENTS_LIMIT)
  );
export default function Home() {
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useFirestoreInfiniteQuery<TMadnessContent>('markdownContents', contentsQuery(), (snapshot) => {
      if (snapshot.docs.length >= MADNESS_CONTENTS_LIMIT) {
        const lastContentDocument = snapshot.docs[snapshot.docs.length - 1];
        return contentsQuery(lastContentDocument);
      }
    });
  const onLoadMoreHandler = () => {
    fetchNextPage();
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
            data.pages.map((page, idx) => (
              <React.Fragment key={idx}>
                {page.docs.map((doc) => (
                  <Box key={doc.id}>
                    <MadnessContent contentSnap={doc} />
                    <Divider sx={{ my: { xs: 2, sm: 3 }, mx: { sm: -3 } }} />
                  </Box>
                ))}
              </React.Fragment>
            ))
          )}

          {!!data && (
            <Box sx={{ textAlign: 'center' }}>
              {hasNextPage ? (
                <LoadingButton
                  onClick={onLoadMoreHandler}
                  loading={isFetchingNextPage}
                  variant="contained"
                  size="large"
                >
                  Load more
                </LoadingButton>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No more contents
                </Typography>
              )}
            </Box>
          )}

          {!!data && data.pages.length > 0 && isError && (
            <Typography align="center" variant="body2" color="error.main">
              {error?.message}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
}

Home.requireNoAuth = true;

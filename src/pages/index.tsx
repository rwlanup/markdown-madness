import { Typography } from '@mui/material';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>MarkDown Madness - Share, Express Yourself and Level Up!</title>
        <meta
          name="description"
          content="MarkDown Madness is a game for code contributors to create markdown posts. Earn points, unlock new features, and collaborate with others. Have fun and be creative!"
        />
      </Head>
      <main>
        <Typography>Markdown Content</Typography>
      </main>
    </>
  );
}

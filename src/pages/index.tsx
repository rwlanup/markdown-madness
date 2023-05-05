import { MadnessContent as TMadnessContent } from '@/types/madness';
import MadnessContent from '@/components/madness/madness-content';
import { Box, Divider, Grid } from '@mui/material';
import Head from 'next/head';

const posts: TMadnessContent[] = [
  {
    id: 'n',
    markdown:
      '# Naruto Shippuden\n## Overview\nNaruto Shippuden is an anime series based on the popular Naruto manga by Masashi Kishimoto. The series began airing in Japan in 2007 and concluded in 2017 after 500 episodes.\n## Plot\nThe story follows Naruto Uzumaki, a young ninja from the Hidden Leaf Village, as he embarks on a journey to become the Hokage, the leader of his village. Along the way, Naruto and his friends must face many challenges, including battles with powerful enemies and personal struggles.\n## Characters\nSome of the main characters in the series include:\n* Naruto Uzumaki\n* Sasuke Uchiha\n* Sakura Haruno\n* Kakashi Hatake\n ![Naruto Shippuden poster](https://cdn.myanimelist.net/images/anime/5/17407.jpg)\n## Blockquote\n> Believe it! - Naruto Uzumaki\n \n ## Code Block\n```javascript\nfunction jutsu(name) {\n  console.log(`Performing ${name} jutsu!`);\n}\n```',
    createdAt: '2023-05-01T17:43:00.000Z',
    likesCount: 20000,
    score: 4000000,
    dislikeCount: 0,
  },
  {
    id: '1',
    markdown:
      '![cat-meme](https://i.imgur.com/zK9x2oN.jpeg) \n\n **Why did the cat wear a fancy dress?** \n\n Because it was feline good. 😂',
    createdAt: '2023-05-01T09:00:00.000Z',
    likesCount: 5,
    score: 10,
    dislikeCount: 1,
  },
  {
    id: '2',
    markdown:
      '![dog-meme](https://i.imgur.com/4j4yjqO.jpeg) \n\n **What do you call a dog magician?** \n\n A Labracadabrador! 😆',
    createdAt: '2023-05-02T10:30:00.000Z',
    likesCount: 3,
    score: 6,
    dislikeCount: 0,
  },
  {
    id: '3',
    markdown:
      '![programming-meme](https://i.imgur.com/Q8a5Sib.jpeg) \n\n **Why do programmers prefer dark mode?** \n\n Because light attracts bugs. 😁',
    createdAt: '2023-05-02T15:45:00.000Z',
    likesCount: 7,
    score: 12,
    dislikeCount: 2,
  },
  {
    id: '4',
    markdown:
      '![coffee-meme](https://i.imgur.com/3Yt1ZgE.jpeg) \n\n **Why did the coffee file a police report?** \n\n Because it was mugged. ☕',
    createdAt: '2023-05-03T12:15:00.000Z',
    likesCount: 8,
    score: 14,
    dislikeCount: 3,
  },
  {
    id: '5',
    markdown:
      "![cat-meme-2](https://i.imgur.com/AmJ0k4J.jpeg) \n\n **Why don't cats play poker in the jungle?** \n\n Too many cheetahs. 😹",
    createdAt: '2023-05-03T17:00:00.000Z',
    likesCount: 4,
    score: 7,
    dislikeCount: 1,
  },
  {
    id: '6',
    markdown:
      "![bicycle-meme](https://i.imgur.com/kqBz3on.jpeg) \n\n **Why couldn't the bicycle stand up by itself?** \n\n Because it was two-tired. 😂",
    createdAt: '2023-05-04T09:45:00.000Z',
    likesCount: 6,
    score: 11,
    dislikeCount: 2,
  },
  {
    id: '7',
    markdown:
      '![math-meme](https://i.imgur.com/v9ZzjHI.jpeg) \n\n **Why did the math book look so sad?** \n\n Because it had too many problems. 📚',
    createdAt: '2023-05-04T13:30:00.000Z',
    likesCount: 9,
    score: 16,
    dislikeCount: 3,
  },
  {
    id: '8',
    markdown: "**Why don't scientists trust atoms?** \n\n Because they make up everything. 😂",
    createdAt: '2023-05-05T08:00:00.000Z',
    likesCount: 0,
    score: 0,
    dislikeCount: 0,
  },
  {
    id: '9',
    markdown: "**Why do seagulls fly over the sea?** \n\n Because if they flew over the bay, they'd be bagels. 🥯",
    createdAt: '2023-05-05T08:15:00.000Z',
    likesCount: 0,
    score: 0,
    dislikeCount: 0,
  },
  {
    id: '10',
    markdown: '**Why did the tomato turn red?** \n\n Because it saw the salad dressing. 😆',
    createdAt: '2023-05-05T08:30:00.000Z',
    likesCount: 0,
    score: 0,
    dislikeCount: 0,
  },
  {
    id: '11',
    markdown: '**What do you call a fake noodle?** \n\n An impasta. 😁',
    createdAt: '2023-05-05T08:45:00.000Z',
    likesCount: 0,
    score: 0,
    dislikeCount: 0,
  },
  {
    id: '12',
    markdown: '**Why did the cookie go to the doctor?** \n\n Because it felt crummy. 🍪',
    createdAt: '2023-05-05T09:00:00.000Z',
    likesCount: 0,
    score: 0,
    dislikeCount: 0,
  },
  {
    id: '13',
    markdown: "**Why don't skeletons fight each other?** \n\n They don't have the guts. 😂",
    createdAt: '2023-05-05T09:15:00.000Z',
    likesCount: 0,
    score: 0,
    dislikeCount: 0,
  },
  {
    id: '14',
    markdown: '**Why did the chicken cross the playground?** \n\n To get to the other slide. 😆',
    createdAt: '2023-05-05T09:30:00.000Z',
    likesCount: 0,
    score: 0,
    dislikeCount: 0,
  },
  {
    id: '15',
    markdown: '**What do you call a lazy kangaroo?** \n\n A pouch potato. 😁',
    createdAt: '2023-05-05T09:45:00.000Z',
    likesCount: 0,
    score: 0,
    dislikeCount: 0,
  },
  {
    id: '16',
    markdown: '**Why did the coffee file a police report?** \n\n Because it got mugged. ☕',
    createdAt: '2023-05-05T10:00:00.000Z',
    likesCount: 0,
    score: 0,
    dislikeCount: 0,
  },
];

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
      <Box component="main" sx={{ '& > .MuiCard-root': { my: 3 } }}>
        {posts.map((post) => (
          <>
            <MadnessContent key={post.id} content={post} />
            <Divider />
          </>
        ))}
      </Box>
    </>
  );
}

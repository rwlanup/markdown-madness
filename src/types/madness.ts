import type { Timestamp } from 'firebase/firestore';
import type { Contributor } from './contributor';
import { REACTION } from './other';

export interface MadnessContent {
  id: string;
  contributor: Pick<Contributor, 'username' | 'avatarUrl'>;
  createdAt: string;
  markdown: string;
  policeCount: number;
  reactionCount: Record<REACTION, number>;
  score: number;
}

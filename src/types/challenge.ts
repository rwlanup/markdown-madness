import { Timestamp } from 'firebase/firestore';
import { Contributor } from './contributor';

export type ChallengeType = 'ROB' | 'PROTECT' | 'SCORE';

export interface Challenge {
  createdAt: Timestamp;
  worthScore: number;
  tasks: Record<ChallengeType, number>;
  winner?: null | (Pick<Contributor, 'avatarUrl'> & { username: string });
}

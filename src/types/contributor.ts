import { ChallengeType } from './challenge';
import { REACTION } from './other';

export interface Contributor {
  avatarUrl?: string;
  challengeScore: Record<ChallengeType, number> & { challengeId: string | null };
  hasChangedPassword: boolean;
  policeCount: number;
  reactedPosts: Record<string, REACTION | null>;
  score: number;
  thiefCount: number;
  password?: string;
}

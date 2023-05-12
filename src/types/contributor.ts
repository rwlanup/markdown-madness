import { REACTION } from './other';

export interface Contributor {
  avatarUrl?: string;
  challengeScore: {
    POST_SCORE: number;
    ROB: number;
    SCORE: number;
    PROTECT: number;
  };
  hasChangedPassword: boolean;
  policeCount: number;
  reactedPosts: Record<string, REACTION>;
  score: number;
  thiefCount: number;
  password?: string;
}

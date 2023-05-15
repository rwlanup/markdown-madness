import { REACTION } from './other';

export interface Contributor {
  avatarUrl?: string;
  challengeScore: {
    ROB: number;
    SCORE: number;
    PROTECT: number;
  };
  hasChangedPassword: boolean;
  policeCount: number;
  reactedPosts: Record<string, REACTION | null>;
  score: number;
  thiefCount: number;
  password?: string;
}

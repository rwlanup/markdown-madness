import { Avatar, Box, Skeleton, Typography } from '@mui/material';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { ChallengeType } from '@/types/challenge';
import useChallengeQuery from '@/hooks/useChallengeQuery';
import useAuthUser from '@/hooks/useAuthUser';
import Image from 'next/image';
import TrophyImage from '@images/trophy.png';

function ChallengeItem({ children, isChallengeComplete }: { children: React.ReactNode; isChallengeComplete: boolean }) {
  const Icon = isChallengeComplete ? CheckCircleRoundedIcon : CircleRoundedIcon;
  return (
    <Box sx={{ display: 'flex' }}>
      <Icon fontSize="small" sx={{ mr: 1, color: isChallengeComplete ? 'success.main' : 'secondary.400' }} />
      <Typography component="span" variant="body2">
        {children}
      </Typography>
    </Box>
  );
}

function elaborateChallengeInText(type: ChallengeType, value: number): string {
  switch (type) {
    case 'PROTECT':
      return `Add protection for ${value} content${value > 1 ? 's' : ''}`;
    case 'ROB':
      return `Rob points from ${value} content${value > 1 ? 's' : ''}`;
    case 'SCORE':
      return `Increase your score by ${value} point${value > 1 ? 's' : ''}`;
  }
}

export default function ChallengeStatus() {
  const { isError, isFetching, challengeDoc } = useChallengeQuery();
  const { data: userSnap } = useAuthUser();
  const userData = userSnap?.data();

  if (isError) return null;
  if (!isFetching && !challengeDoc) return null;

  return (
    <Box sx={{ p: 2.5, bgcolor: 'secondary.100', borderRadius: 0.75 }}>
      {isFetching || !challengeDoc ? (
        <>
          <Skeleton height={28} width={160} />
          <Box sx={{ mt: 1.5, mb: 0.5 }}>
            <Skeleton height={20} width="100%" />
            <Skeleton height={20} width="100%" />
            <Skeleton height={20} width="100%" />
          </Box>
        </>
      ) : (
        <>
          <Typography variant="overline" component="h3" fontWeight="Bold">
            {challengeDoc.winner ? 'Past challenge' : 'Ongoing challenge'}
          </Typography>
          {challengeDoc.winner ? (
            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}
            >
              <Image src={TrophyImage} alt="Trophy for winner" width={160} height={160} />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  bgcolor: 'secondary.50',
                  px: 2,
                  py: 1,
                  borderRadius: 0.5,
                }}
              >
                <Avatar
                  sx={{ bgcolor: 'primary.main' }}
                  src={challengeDoc.winner.avatarUrl}
                  alt={challengeDoc.winner.username[0].toUpperCase()}
                />
                <Typography variant="h6" fontWeight="Medium">
                  {challengeDoc.winner.username}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box component="ul" sx={{ listStyle: 'none', pl: 0, mt: 1.5, mb: 0.5 }}>
              {Object.keys(challengeDoc.tasks).map((type, index) => (
                <Box component="li" sx={{ mt: index === 0 ? 0 : 1 }} key={type}>
                  <ChallengeItem
                    isChallengeComplete={
                      !!userData &&
                      userData.challengeScore.challengeId === challengeDoc.id &&
                      userData.challengeScore[type as ChallengeType] >= challengeDoc.tasks[type as ChallengeType]!
                    }
                  >
                    {elaborateChallengeInText(type as ChallengeType, challengeDoc.tasks[type as ChallengeType]!)}
                  </ChallengeItem>
                </Box>
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

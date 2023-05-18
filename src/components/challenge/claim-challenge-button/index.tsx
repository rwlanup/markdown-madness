import useAuthUser from '@/hooks/useAuthUser';
import useChallengeQuery from '@/hooks/useChallengeQuery';
import useClaimChallengePoints from '@/hooks/useClaimChallengePoints';
import { ChallengeType } from '@/types/challenge';
import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';

export default function ClaimChallengeButton() {
  const { data: userSnap } = useAuthUser();
  const { challengeDoc } = useChallengeQuery();
  const userData = userSnap?.data();

  const hasCompletedAllTasks =
    !!userData && !!challengeDoc
      ? Object.keys(challengeDoc.tasks).every(
          (task) => userData.challengeScore[task as ChallengeType] >= challengeDoc.tasks[task as ChallengeType]!
        ) && userData.challengeScore.challengeId === challengeDoc.id
      : false;

  const mutation = useClaimChallengePoints();

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        pl: 'inherit',
        pr: 'inherit',
        width: 1,
        zIndex: (theme) => theme.zIndex.drawer + 2,
        display: hasCompletedAllTasks ? 'block' : 'none',
      }}
    >
      <Box
        sx={{
          py: 1,
          px: 2,
          bgcolor: 'success.main',
          color: 'common.white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography fontWeight="Medium" align="center">
          You have completed all tasks of ongoing challenge.
        </Typography>
        <LoadingButton
          loading={mutation.isLoading}
          onClick={() => mutation.mutate()}
          loadingIndicator="Claiming..."
          color="secondary"
          variant="contained"
        >
          Claim Points
        </LoadingButton>
      </Box>
    </Box>
  );
}

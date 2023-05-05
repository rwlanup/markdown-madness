import { Box, Typography } from '@mui/material';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

function ChallengeItem({ children }: { children: React.ReactNode }) {
  const isChallengeComplete = true;
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

export default function ChallengeStatus() {
  return (
    <Box sx={{ p: 2.5, bgcolor: 'secondary.100', borderRadius: 0.75 }}>
      <Typography variant="overline" component="h3" fontWeight="Bold">
        Ongoing Challenge
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', pl: 0, mt: 1.5, mb: 0.5 }}>
        <Box component="li" sx={{ mb: 1 }}>
          <ChallengeItem>Contribute 4 madness content</ChallengeItem>
        </Box>
        <Box component="li">
          <ChallengeItem>Increase your score by 100</ChallengeItem>
        </Box>
      </Box>
    </Box>
  );
}

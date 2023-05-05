import ChallengeStatus from '@/components/challenge/challenge-status';
import TopContributor from '@/components/contributor/top-contributor';
import { Box, Divider, Drawer, Toolbar } from '@mui/material';

export default function StatusSidebar() {
  return (
    <Drawer PaperProps={{ sx: { width: { xs: 240, sm: 360 } } }} variant="persistent" open anchor="right">
      <Toolbar />
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <ChallengeStatus />
      </Box>
      <Divider />
      <TopContributor />
    </Drawer>
  );
}

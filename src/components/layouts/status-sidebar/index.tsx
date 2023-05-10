import ChallengeStatus from '@/components/challenge/challenge-status';
import TopContributor from '@/components/contributor/top-contributor';
import { Box, Divider, Drawer, Theme, Toolbar, useMediaQuery } from '@mui/material';

export default function StatusSidebar() {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
    defaultMatches: false,
  });
  return (
    <Drawer
      PaperProps={{ sx: { width: { xs: 240, sm: 360 } } }}
      variant={isDesktop ? 'persistent' : 'temporary'}
      open={isDesktop}
      anchor="right"
    >
      <Toolbar />
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <ChallengeStatus />
      </Box>
      <Divider />
      <TopContributor />
    </Drawer>
  );
}

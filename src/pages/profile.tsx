import { intToString } from '@/helper/number';
import useAuthUser from '@/hooks/useAuthUser';
import { Avatar, Box, Divider, Grid, LinearProgress, Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import PoliceImage from '@images/police.png';
import ThiefImage from '@images/thief.png';
import CoinImage from '@images/coin.png';

function ProfileMetaData() {
  const { data: userSnap } = useAuthUser();
  return (
    <Head>
      <title>{userSnap?.id} - Profile | Markdown Madness</title>
    </Head>
  );
}

const IMAGE_SIZE = 48;

export default function ProfilePage() {
  const { data: userSnap } = useAuthUser();
  if (!userSnap?.exists()) return null;
  const userData = userSnap.data();
  return (
    <>
      <ProfileMetaData />
      <Box component="main" sx={{ p: { xs: 2, sm: 3 }, bgcolor: 'common.white' }}>
        <Grid container direction="column" alignItems="center" spacing={1}>
          <Grid item>
            <Avatar src={userData.avatarUrl} alt={userSnap.id[0].toUpperCase()} sx={{ width: 60, height: 60 }} />
          </Grid>
          <Grid item>
            <Typography component="h1" variant="h5" fontWeight="Bold">
              {userSnap.id}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography sx={{ mb: 2 }} align="center" variant="h6" component="h2" fontWeight="Bold">
          Your stats
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
          <Grid item xs="auto">
            <Box
              sx={{
                flex: '1',
                bgcolor: 'warning.100',
                borderRadius: 0.25,
                py: 1,
                px: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Score
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Image src={CoinImage} height={IMAGE_SIZE} width={IMAGE_SIZE} alt="" />
                <Typography variant="h4" component="span" fontWeight="Bold">
                  {intToString(userData.score)}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs="auto">
            <Box
              sx={{
                flex: '1',
                bgcolor: 'primary.50',
                borderRadius: 0.25,
                py: 1,
                px: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Police
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Image src={PoliceImage} height={IMAGE_SIZE} width={IMAGE_SIZE} alt="" />
                <Typography variant="h4" component="span" fontWeight="Bold">
                  {intToString(userData.policeCount)}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs="auto">
            <Box
              sx={{
                flex: '1',
                bgcolor: 'secondary.50',
                borderRadius: 0.25,
                py: 1,
                px: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Thief
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Image src={ThiefImage} height={IMAGE_SIZE} width={IMAGE_SIZE} alt="" />
                <Typography variant="h4" component="span" fontWeight="Bold">
                  {intToString(userData.thiefCount)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ maxWidth: '480px', mx: 'auto' }}>
          <Typography align="center" variant="h6" component="h3" fontWeight="Bold">
            Your challenge score
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3 }} direction="column">
            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography color="text.secondary" variant="body2" fontWeight="Medium">
                  Score
                </Typography>
                <Typography fontWeight="Bold" color="success.main">
                  {userData.challengeScore.SCORE} / 120
                </Typography>
              </Box>
              <LinearProgress variant="determinate" color="success" sx={{ height: 12, borderRadius: 0.5 }} value={50} />
            </Grid>
            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography color="text.secondary" variant="body2" fontWeight="Medium">
                  Protect
                </Typography>
                <Typography fontWeight="Bold" color="primary.main">
                  {userData.challengeScore.PROTECT} / 12
                </Typography>
              </Box>
              <LinearProgress variant="determinate" color="primary" sx={{ height: 12, borderRadius: 0.5 }} value={40} />
            </Grid>
            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography color="text.secondary" variant="body2" fontWeight="Medium">
                  Rob
                </Typography>
                <Typography fontWeight="Bold" color="secondary.main">
                  {userData.challengeScore.ROB} / 6
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                color="secondary"
                sx={{ height: 12, borderRadius: 0.5 }}
                value={70}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

ProfilePage.auth = true;

import { formatDateTime } from '@/helper/datetime';
import type { MadnessContent } from '@/types/madness';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { Highlight, themes } from 'prism-react-renderer';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import MuiMarkdown, { getOverrides } from 'mui-markdown';
import { intToString } from '@/helper/number';

interface MadnessContentProps {
  content: MadnessContent;
}

const markdownOverrides: React.ComponentProps<typeof MuiMarkdown>['overrides'] = {
  ...getOverrides({
    Highlight,
    themes,
    theme: themes.dracula,
  }),
  h1: { component: Typography, props: { component: 'h1', variant: 'h5', fontWeight: 'Bold' } },
  h2: { component: Typography, props: { component: 'h2', variant: 'h6', fontWeight: 'Bold' } },
  h3: { component: Typography, props: { component: 'h3', variant: 'subtitle1', fontWeight: 'Bold' } },
  h4: { component: Typography, props: { component: 'h4', variant: 'subtitle2', fontWeight: 'Bold' } },
  h5: { component: Typography, props: { component: 'h4', variant: 'subtitle2', fontWeight: 'Bold' } },
  h6: { component: Typography, props: { component: 'h4', variant: 'subtitle2', fontWeight: 'Bold' } },
  img: { component: Box, props: { component: 'img', sx: { maxWidth: '100%' } } },
};

export default function MadnessContent({ content }: MadnessContentProps) {
  const formattedPostedDateTime = formatDateTime(content.createdAt);
  return (
    <Card elevation={0}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>A</Avatar>}
        title="Anup Rawal"
        subheader={`Posted on ${formattedPostedDateTime}`}
        titleTypographyProps={{ fontWeight: 'Medium' }}
      />
      <CardContent>
        <MuiMarkdown overrides={markdownOverrides}>{content.markdown}</MuiMarkdown>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
        <ButtonGroup>
          <Button startIcon={<ThumbUpRoundedIcon />}>
            <Box component="span" sx={{ ml: 0.5 }}>
              {intToString(content.likesCount)}
            </Box>
          </Button>
          <Button startIcon={<ThumbDownRoundedIcon />}>
            <Box component="span" sx={{ ml: 0.5 }}>
              {intToString(content.dislikeCount)}
            </Box>
          </Button>
        </ButtonGroup>
        <Box>
          <Typography variant="body2" fontWeight="Bold">
            {intToString(content.score)} Points
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
}

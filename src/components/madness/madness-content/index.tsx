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
  return (
    <Card
      elevation={0}
      variant="outlined"
      sx={{
        maxWidth: '720px',
        mx: 'auto',
        borderRadius: { xs: 0, sm: 1 },
      }}
    >
      <CardHeader
        avatar={
          <Avatar src={content.contributor.avatarUrl} sx={{ bgcolor: 'primary.main' }}>
            {content.contributor.username[0].toUpperCase()}
          </Avatar>
        }
        title={content.contributor.username}
        subheader={`Posted on ${content.createdAt}`}
        titleTypographyProps={{ fontWeight: 'Medium' }}
      />
      <CardContent
        sx={{
          borderTop: 1,
          borderBottom: 1,
          borderColor: 'divider',
          maxHeight: 'calc(100vh - 260px)',
          overflowY: 'auto',
        }}
      >
        <MuiMarkdown overrides={markdownOverrides}>{content.markdown}</MuiMarkdown>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        <ButtonGroup>
          <Button startIcon={<ThumbUpRoundedIcon />}>
            {content.reactionCount.LIKES > 0 && (
              <Box component="span" sx={{ ml: 0.5 }}>
                {intToString(content.reactionCount.LIKES)}
              </Box>
            )}{' '}
            Like{content.reactionCount.LIKES > 1 && 's'}
          </Button>
          <Button startIcon={<ThumbDownRoundedIcon />}>
            {content.reactionCount.DISLIKES > 0 && (
              <Box component="span" sx={{ ml: 0.5 }}>
                {intToString(content.reactionCount.DISLIKES)}
              </Box>
            )}
            Dislike{content.reactionCount.DISLIKES > 1 && 's'}
          </Button>
        </ButtonGroup>
        {content.score > 0 && (
          <Box>
            <Typography color="warning.800" variant="body2" fontWeight="Bold">
              {intToString(content.score)} Points
            </Typography>
          </Box>
        )}
      </CardActions>
    </Card>
  );
}

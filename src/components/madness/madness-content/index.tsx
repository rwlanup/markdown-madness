import type { MadnessContent as TMadnessContent } from '@/types/madness';
import {
  Avatar,
  Box,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Tooltip,
  Typography,
} from '@mui/material';
import { Highlight, themes } from 'prism-react-renderer';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import MuiMarkdown, { getOverrides } from 'mui-markdown';
import { intToString } from '@/helper/number';
import type { QueryDocumentSnapshot } from 'firebase/firestore';
import { formatDateTime } from '@/helper/datetime';
import useAuthUser from '@/hooks/useAuthUser';
import useLike from '@/hooks/useLike';
import useDislike from '@/hooks/useDislike';
import { LoadingButton } from '@mui/lab';

interface MadnessContentProps {
  contentSnap: QueryDocumentSnapshot<Omit<TMadnessContent, 'id'>>;
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

export default function MadnessContent({ contentSnap }: MadnessContentProps) {
  const content = contentSnap.data();
  const { data } = useAuthUser();

  const userData = data?.data();
  const isLiked =
    !!userData && contentSnap.id in userData.reactedPosts && userData.reactedPosts[contentSnap.id] === 'LIKES';
  const isDisliked =
    !!userData && contentSnap.id in userData.reactedPosts && userData.reactedPosts[contentSnap.id] === 'DISLIKES';
  const likeMutation = useLike(contentSnap.id);
  const dislikeMutation = useDislike(contentSnap.id);

  return (
    <Card
      elevation={0}
      variant="outlined"
      sx={{
        maxWidth: 'md',
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
        subheader={`Posted on ${formatDateTime(content.createdAt)}`}
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
          <Tooltip title="Like">
            <LoadingButton
              variant="outlined"
              onClick={() => likeMutation.mutate()}
              loading={likeMutation.isLoading}
              startIcon={isLiked ? <ThumbUpRoundedIcon /> : <ThumbUpOutlinedIcon />}
              sx={{ '.MuiButton-startIcon': { mr: 0 } }}
            >
              {content.reactionCount.LIKES > 0 && (
                <Box component="span" sx={{ ml: 1 }}>
                  {intToString(content.reactionCount.LIKES)}
                </Box>
              )}
            </LoadingButton>
          </Tooltip>
          <Tooltip title="Dislike">
            <LoadingButton
              variant="outlined"
              onClick={() => dislikeMutation.mutate()}
              loading={dislikeMutation.isLoading}
              startIcon={isDisliked ? <ThumbDownRoundedIcon /> : <ThumbDownOutlinedIcon />}
            >
              {content.reactionCount.DISLIKES > 0 && (
                <Box component="span" sx={{ ml: 1 }}>
                  {intToString(content.reactionCount.DISLIKES)}
                </Box>
              )}
            </LoadingButton>
          </Tooltip>
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

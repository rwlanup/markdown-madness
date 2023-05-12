import { Contributor } from '@/types/contributor';
import { contributorsCollectionRef } from '@firebase/collections';
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { QueryDocumentSnapshot, limit, orderBy, query } from 'firebase/firestore';
import { enqueueSnackbar } from 'notistack';
import { intToString } from '@/helper/number';

interface ContributorListItemProps {
  contributorSnap: QueryDocumentSnapshot<Contributor>;
}

function ContributorListItem({ contributorSnap }: ContributorListItemProps) {
  const data = contributorSnap.data();
  return (
    <ListItem disablePadding>
      <ListItemButton sx={{ px: { xs: 2, sm: 3 } }}>
        <ListItemAvatar>
          <Avatar alt={contributorSnap.id[0].toUpperCase()} src={data.avatarUrl} />
        </ListItemAvatar>
        <ListItemText primary={contributorSnap.id} secondary={`${intToString(data.score)} Points`} />
      </ListItemButton>
    </ListItem>
  );
}

function ContributorListItemSkeleton() {
  return (
    <ListItem disablePadding>
      <ListItemButton sx={{ px: { xs: 2, sm: 3 } }}>
        <ListItemAvatar>
          <Skeleton variant="circular" height={40} width={40} />
        </ListItemAvatar>
        <ListItemText primary={<Skeleton height={20} width={240} />} secondary={<Skeleton height={20} width={200} />} />
      </ListItemButton>
    </ListItem>
  );
}

const topContributorsQueryRef = query(contributorsCollectionRef, orderBy('score', 'desc'), limit(3));

export default function TopContributor() {
  const { isFetching, data, isError } = useFirestoreQuery(
    'topContributors',
    topContributorsQueryRef,
    { subscribe: true },
    {
      onError() {
        enqueueSnackbar('Could not get top contributors data', { variant: 'error' });
      },
    }
  );
  if (isError) return null;
  return (
    <Box>
      <Typography
        sx={{ px: { xs: 2, sm: 3 }, pt: 2 }}
        color="text.secondary"
        variant="overline"
        fontWeight="Bold"
        component="h3"
      >
        Top Contributor
      </Typography>
      <List disablePadding>
        {isFetching || !data
          ? Array(3)
              .fill('')
              .map((_, idx) => <ContributorListItemSkeleton key={idx} />)
          : data.docs.map((doc) => <ContributorListItem contributorSnap={doc} key={doc.id} />)}
      </List>
    </Box>
  );
}

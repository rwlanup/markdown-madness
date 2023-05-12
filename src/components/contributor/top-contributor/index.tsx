import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';

interface ContributorListItemProps {
  name: string;
  imageUrl?: string;
  score: number;
}

function ContributorListItem({ name, score, imageUrl }: ContributorListItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton sx={{ px: { xs: 2, sm: 3 } }}>
        <ListItemAvatar>
          <Avatar alt={name} src={imageUrl}>
            {name[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={`${score} Points`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function TopContributor() {
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
        <ContributorListItem name="Anup Rawal" score={2000} />
        <ContributorListItem name="Sanjima Tamang" score={440008} />
      </List>
    </Box>
  );
}

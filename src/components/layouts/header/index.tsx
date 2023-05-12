import { AppBar, Avatar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import Sidebar from '../sidebar';
import useToggle from '@/hooks/useToggle';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Header() {
  const [isDrawerOpen, toggleIsDrawerOpen] = useToggle(false);
  const session = useSession();
  return (
    <>
      <AppBar
        elevation={0}
        color="transparent"
        position="fixed"
        sx={{
          zIndex: (theme) => ({ md: theme.zIndex.drawer + 1 }),
          bgcolor: 'common.white',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleIsDrawerOpen}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuRoundedIcon />
          </IconButton>
          <Typography sx={{ display: { xs: 'none', sm: 'block' } }} variant="subtitle1" fontWeight="Medium" noWrap>
            Markdown Madness
          </Typography>
          {!!session.data && session.status === 'authenticated' ? (
            <Avatar
              sx={{ ml: 'auto', bgcolor: 'primary.main' }}
              alt={session.data.user.username[0].toUpperCase()}
              src={session.data.user.avatarUrl}
            />
          ) : (
            <Button sx={{ ml: 'auto' }} variant="contained" LinkComponent={Link} href="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Sidebar isOpen={isDrawerOpen} toggleIsOpen={toggleIsDrawerOpen} />
    </>
  );
}

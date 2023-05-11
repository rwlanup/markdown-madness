import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import Sidebar from '../sidebar';
import useToggle from '@/hooks/useToggle';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Link from 'next/link';
import useAppSelector from '@/hooks/useAppSelector';
import { useLoginMutation } from '@/store/services/auth';
import { useEffect } from 'react';
import { getAuthFromStorage } from '@/helper/storage';

export default function Header() {
  const [isDrawerOpen, toggleIsDrawerOpen] = useToggle(false);
  const user = useAppSelector((state) => state.auth.user);
  const [login] = useLoginMutation();

  useEffect(() => {
    const userInfo = getAuthFromStorage();
    if (userInfo) {
      login(userInfo);
    }
  }, [login]);

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
          {!!user ? (
            <Avatar sx={{ ml: 'auto' }} alt={user.username[0].toUpperCase()} src={user.avatarUrl} />
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

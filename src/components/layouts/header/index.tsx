import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import Sidebar from '../sidebar';
import useToggle from '@/hooks/useToggle';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

export default function Header() {
  const [isDrawerOpen, toggleIsDrawerOpen] = useToggle(false);
  return (
    <>
      <AppBar
        elevation={0}
        color="transparent"
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
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
          <Typography variant="subtitle1" fontWeight="Medium" noWrap>
            Markdown Madness
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
            <Button variant="outlined">Login</Button>
            <Button variant="contained">Create account</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Sidebar isOpen={isDrawerOpen} toggleIsOpen={toggleIsDrawerOpen} />
    </>
  );
}

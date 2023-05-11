import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  Theme,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import { mergeSxProps } from '@/helper/props';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import { removeAuth } from '@/store/services/auth';

interface MenuItemButtonProps {
  Icon: React.ReactElement;
  label: string;
}
function MenuItem<T extends React.ElementType>({
  Icon,
  label,
  sx,
  children,
  ...props
}: MenuItemButtonProps & ListItemButtonProps<T>) {
  return (
    <ListItem disablePadding>
      <ListItemButton
        {...props}
        sx={mergeSxProps(sx, {
          borderTopRightRadius: 9999,
          borderBottomRightRadius: 9999,
          pr: 3,
          mb: 1,
          '&.Mui-selected': { bgcolor: 'primary.100', color: 'primary.dark' },
        })}
      >
        <ListItemIcon>{Icon}</ListItemIcon>
        <ListItemText primary={label} />
        {children}
      </ListItemButton>
    </ListItem>
  );
}

interface SidebarProps {
  isOpen: boolean;
  toggleIsOpen: () => void;
}
export default function Sidebar({ isOpen, toggleIsOpen }: SidebarProps) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
    defaultMatches: true,
  });
  const pathname = usePathname();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(removeAuth());
  };

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={isOpen || !isMobile}
      onClose={toggleIsOpen}
      ModalProps={{ keepMounted: true }}
      PaperProps={{ sx: { width: 280 } }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleIsOpen}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Toolbar>
      <List sx={{ pr: 4 }}>
        <MenuItem selected={pathname === '/'} Icon={<FeedRoundedIcon />} label="Feed" LinkComponent={Link} href="/" />
        <MenuItem
          selected={pathname === '/store'}
          Icon={<StorefrontRoundedIcon />}
          label="Store"
          LinkComponent={Link}
          href="/store"
        />
        {!!user && (
          <>
            <MenuItem
              selected={pathname === '/profile'}
              Icon={<PersonRoundedIcon />}
              label="Profile"
              LinkComponent={Link}
              href="/profile"
            />
            <MenuItem
              selected={pathname === '/password-setting'}
              Icon={<ManageAccountsRoundedIcon />}
              label="Change Password"
              LinkComponent={Link}
              href="/password-setting"
            >
              {!user.hasChangedPassword && <WarningRoundedIcon color="error" />}
            </MenuItem>
            <MenuItem onClick={logout} Icon={<LogoutRoundedIcon />} label="Logout" />
          </>
        )}
      </List>
    </Drawer>
  );
}

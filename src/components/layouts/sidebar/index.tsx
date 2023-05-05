import {
  Drawer,
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
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import { mergeSxProps } from '@/helper/props';

interface MenuItemButtonProps {
  Icon: React.ReactElement;
  label: string;
}
function MenuItem<T extends React.ElementType>({
  Icon,
  label,
  sx,
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
    defaultMatches: false,
  });
  const pathname = usePathname();

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={isOpen || !isMobile}
      onClose={toggleIsOpen}
      ModalProps={{ keepMounted: true }}
      PaperProps={{ sx: { width: 240 } }}
    >
      <Toolbar />
      <List sx={{ pr: 4 }}>
        <MenuItem selected={pathname === '/'} Icon={<FeedRoundedIcon />} label="Feed" LinkComponent={Link} href="/" />
        <MenuItem
          selected={pathname === '/store'}
          Icon={<StorefrontRoundedIcon />}
          label="Store"
          LinkComponent={Link}
          href="/store"
        />
        <MenuItem
          selected={pathname === '/profile'}
          Icon={<PersonRoundedIcon />}
          label="Profile"
          LinkComponent={Link}
          href="/profile"
        />
        <MenuItem Icon={<ManageAccountsRoundedIcon />} label="Change password" />
        <MenuItem Icon={<LogoutRoundedIcon />} label="Logout" />
      </List>
    </Drawer>
  );
}

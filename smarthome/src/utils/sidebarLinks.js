import { FaTemperatureHalf } from 'react-icons/fa6';
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi';
import {
  MdOutlineChildFriendly,
  MdOutlineHistory,
  MdOutlineLightMode,
} from 'react-icons/md';

export const sidebarLinks = [
  {
    key: 'temperature',
    label: 'Temperature',
    scope: 'public',
    icon: <FaTemperatureHalf />,
    
  },
  {
    key: 'light',
    label: 'Light',
    scope: 'public',
    icon: <MdOutlineLightMode />,
  },
  {
    key: 'history',
    label: 'Changes History',
    scope: 'public',
    icon: <MdOutlineHistory />,
  },
  {
    key: 'privileges',
    label: 'Children Privileges',
    scope: 'parent',
    icon: <MdOutlineChildFriendly />,
  },
];

export const sidebarBottomLinks = [
  {
    key: 'settings',
    label: 'Settings',
    icon: <FiSettings />,
    navigation: '/settings',
  },
  {
    key: 'profile',
    label: 'Profile',
    icon: <FiUser />,
    navigation: '/profile',
  },
  {
    key: 'logout',
    label: 'Logout',
    icon: <FiLogOut />,
    navigation: '/',
  },
];
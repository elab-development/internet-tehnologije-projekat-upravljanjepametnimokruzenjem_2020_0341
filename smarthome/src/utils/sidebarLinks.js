import { FaTemperatureHalf } from 'react-icons/fa6';
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi';
import { MdOutlineHistory, MdOutlineLightMode } from 'react-icons/md';

export const sidebarLinks = [
  {
    key: 'temperature',
    label: 'Temperature',
    icon: <FaTemperatureHalf />,
  },
  {
    key: 'light',
    label: 'Light',
    icon: <MdOutlineLightMode />,
  },
  {
    key: 'history',
    label: 'Changes History',
    icon: <MdOutlineHistory />,
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
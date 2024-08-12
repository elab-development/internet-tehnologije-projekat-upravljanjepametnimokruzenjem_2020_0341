import { FaTemperatureHalf } from 'react-icons/fa6';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { MdOutlineLightMode } from 'react-icons/md';

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
];

export const sidebarBottomLinks = [
  {
    key: 'settings',
    label: 'Settings',
    icon: <FiSettings />,
    navigation: '/settings',
  },
  {
    key: 'logout',
    label: 'Logout',
    icon: <FiLogOut />,
    navigation: '/',
  },
];
import { useContext } from 'react';
import { DashContext } from '../context/DashContext';

export const useDashContext = () => {
  const context = useContext(DashContext);
  if (!context) {
    throw new Error('No Context provided!');
  }
  const {
    loggedInUser,
    setLoggedInUser,
    geolocationData,
    setGeolocationData,
    dashboardView,
    setDashboardView,
    rooms,
    setRooms,
    allChanges,
    setAllChanges,
    filteredChanges,
    setFilteredChanges,
  } = context;
  return {
    loggedInUser,
    setLoggedInUser,
    geolocationData,
    setGeolocationData,
    dashboardView,
    setDashboardView,
    rooms,
    setRooms,
    allChanges,
    setAllChanges,
    filteredChanges,
    setFilteredChanges,
  };
};
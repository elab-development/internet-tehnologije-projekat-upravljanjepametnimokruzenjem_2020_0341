import React, { useState } from 'react';
import { changesRecords, roomsData } from '../utils/data';

export const DashContext = React.createContext({
  loggedInUser: null,
  setLoggedInUser: () => {},
  dashboardView: 'temperature',
  setDashboardView: () => {},
  rooms: [],
  setRooms: () => {},
  allChanges: [],
  setAllChanges: () => {},
  filteredChanges: [],
  setFilteredChanges: () => {},
});

const DashContextWrapper = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [dashboardView, setDashboardView] = useState('temperature');
  const [rooms, setRooms] = useState(roomsData);
  const [allChanges, setAllChanges] = useState(changesRecords);
  const [filteredChanges, setFilteredChanges] = useState(changesRecords);

  return (
    <DashContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        dashboardView,
        setDashboardView,
        rooms,
        setRooms,
        allChanges,
        setAllChanges,
        filteredChanges,
        setFilteredChanges,
      }}
    >
      {props.children}
    </DashContext.Provider>
  );
};

export default DashContextWrapper;
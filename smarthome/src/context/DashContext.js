import React, { useState } from 'react';
import { roomsData } from '../utils/data';

export const DashContext = React.createContext({
  loggedInUser: null,
  setLoggedInUser: () => {},
  dashboardView: 'temperature',
  setDashboardView: () => {},
  rooms: [],
  setRooms: () => {},
});

const DashContextWrapper = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [dashboardView, setDashboardView] = useState('temperature');
  const [rooms, setRooms] = useState(roomsData);

  return (
    <DashContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        dashboardView,
        setDashboardView,
        rooms,
        setRooms,
      }}
    >
      {props.children}
    </DashContext.Provider>
  );
};

export default DashContextWrapper;
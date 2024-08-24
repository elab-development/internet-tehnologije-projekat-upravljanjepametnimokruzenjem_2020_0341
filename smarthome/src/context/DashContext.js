import React, { useEffect, useState } from 'react';
import { changesRecords, roomsData } from '../utils/data';
import { getLocationFromIP } from '../utils/geolocationAPI';
import { getUsername } from '../utils/helpers';
import { getUser } from '../api/authRequests';

export const DashContext = React.createContext({
  loggedInUser: null,
  setLoggedInUser: () => {},
  geoLocationData: null,
  setGeolocationData: () => {},
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
  const [geolocationData, setGeolocationData] = useState(null);
  const [dashboardView, setDashboardView] = useState('temperature');
  const [rooms, setRooms] = useState(roomsData);
  const [allChanges, setAllChanges] = useState(changesRecords);
  const [filteredChanges, setFilteredChanges] = useState(changesRecords);

  useEffect(() => {
    const fetchGeolocation = async () => {
      const res = await getLocationFromIP();
      setGeolocationData(res);
    };
    const getLoggedInUser = async () => {
      const user = await getUsername();
      if (user) {
        const res = await getUser({ username: user.username });
        setLoggedInUser(res.data);
      }
    };

    getLoggedInUser();
    fetchGeolocation();
  }, []);


  return (
    <DashContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </DashContext.Provider>
  );
};

export default DashContextWrapper;
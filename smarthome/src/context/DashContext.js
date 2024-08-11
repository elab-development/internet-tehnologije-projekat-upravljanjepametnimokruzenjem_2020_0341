import React, { useState } from 'react';

export const DashContext = React.createContext({
  loggedInUser: null,
  setLoggedInUser: () => {},
  dashboardView: 'temperature',
  setDashboardView: () => {},
});

const DashContextWrapper = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [dashboardView, setDashboardView] = useState('temperature');

  return (
    <DashContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        dashboardView,
        setDashboardView,
      }}
    >
      {props.children}
    </DashContext.Provider>
  );
};

export default DashContextWrapper;
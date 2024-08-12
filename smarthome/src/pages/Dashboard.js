import React from 'react';


import { useDashContext } from '../hooks/useDashContext.hook';
import Sidebar from '../components/shared/Sidebar';
import Temperature from '../components/views/Temperature';
import Light from '../components/views/Light';

const Dashboard = () => {

  const { dashboardView } = useDashContext();

  return (
    <div className='h-screen flex flex-col bg-slate-50'>
      <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-y-scroll'>
        <div>
          <Sidebar />
        </div>
        <div className='p-4'>
          <div>
            {dashboardView === 'temperature' && <Temperature />}
            {dashboardView === 'light' && <Light />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
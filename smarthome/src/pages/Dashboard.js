import React from 'react';


import { useDashContext } from '../hooks/useDashContext.hook';
import Sidebar from '../components/shared/Sidebar';
import Temperature from '../components/views/Temperature';
import Light from '../components/views/Light';
import History from '../components/views/History';
import Footer from '../components/shared/Footer';

const Dashboard = () => {

  const { dashboardView } = useDashContext();

  return (
    <div className='h-screen flex flex-col bg-slate-50'>
      <div className='flex flex-row bg-neutral-100 h-screen w-screen '>
        <div>
          <Sidebar />
        </div>
        <div className=' flex flex-col justify-between'>
          <div className='p-4 overflow-y-scroll h-full'>
            {dashboardView === 'temperature' && <Temperature />}
            {dashboardView === 'light' && <Light />}
            {dashboardView === 'history' && <History />}
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
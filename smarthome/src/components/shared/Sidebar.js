import React from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../assets/logo.png';
import { useDashContext } from '../../hooks/useDashContext.hook';
import { sidebarBottomLinks, sidebarLinks } from '../../utils/sidebarLinks';

const Sidebar = () => {
    const navigate = useNavigate();
    const { dashboardView, setDashboardView, loggedInUser, setLoggedInUser } =
    useDashContext();

  return (
    <div className='w-60 p-1 flex flex-col text-white bg-[#135993] h-screen'>
      <div className='flex items-center gap-2 px-1 py-3'>
        <img src={Logo} alt='logo' className='w-10 invert' />
        <span className='text-neutral-100 text-lg'>SmartHome Asst.</span>
      </div>
      <div className='flex-1 mt-3'>
        {sidebarLinks.map((item) => (
           <div key={item.key}>
           {/* Public */}
           {item.scope === 'public' && (
             <div
               onClick={() => setDashboardView(item.key)}
               className={`flex gap-2 items-center font-light px-3 py-2 hover:bg-[#ddf2ff] hover:text-[#135993] hover:no-underline cursor-pointer rounded-md ${
                 dashboardView === item.key && 'bg-[#588bc9]'
               }`}
             >
               <span className='text-xl'>{item.icon}</span>
               {item.label}
             </div>
           )}

           {/* Parent */}
           {item.scope !== 'public' &&
             item.scope === 'parent' &&
             (loggedInUser?.role === 'parent' ||
               loggedInUser?.role === 'admin') && (
               <div
                 onClick={() => setDashboardView(item.key)}
                 className={`flex gap-2 items-center font-light px-3 py-2 hover:bg-[#ddf2ff] hover:text-[#135993] hover:no-underline cursor-pointer rounded-md ${
                   dashboardView === item.key && 'bg-[#588bc9]'
                 }`}
               >
                 <span className='text-xl'>{item.icon}</span>
                 {item.label}
               </div>
             )}

           {/* Admin */}
           {item.scope !== 'public' &&
             item.scope !== 'parent' &&
             item.scope === 'admin' &&
             loggedInUser?.role === 'admin' && (
               <div
                 onClick={() => setDashboardView(item.key)}
                 className={`flex gap-2 items-center font-light px-3 py-2 hover:bg-[#ddf2ff] hover:text-[#135993] hover:no-underline cursor-pointer rounded-md ${
                   dashboardView === item.key && 'bg-[#588bc9]'
                 }`}
               >
                 <span className='text-xl'>{item.icon}</span>
                 {item.label}
               </div>
             )}
          </div>
        ))}
      </div>
      <div className='border-t-2 pt-1'>
        {sidebarBottomLinks.map((item) => (
          <div
            key={item.key}
            className='flex gap-2 items-center font-light px-3 py-2 hover:bg-[#ddf2ff] hover:text-[#135993] hover:no-underline cursor-pointer rounded-md'
            onClick={() => {
              if (item.key === 'logout') {
                setLoggedInUser(null);
              }
              navigate(item.navigation);
            }}
          >
            <span className='text-xl'>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
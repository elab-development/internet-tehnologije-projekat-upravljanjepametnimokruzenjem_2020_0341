import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLocationDot, FaRegUser, FaUsersLine } from 'react-icons/fa6';

import { useDashContext } from '../hooks/useDashContext.hook';
import SettingsMap from '../components/settings/SettingsMap';
import IconInput from '../components/shared/IconInput';

const Settings = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useDashContext();

  useEffect(() => {
    console.log(loggedInUser?.geolocationData);
  }, [loggedInUser]);

  return (
    <div className='bg-primary'>
      <div className='flex justify-center items-center h-screen'>
        <div className='glass-settings' style={{ width: '75%', height: '75%' }}>
          <div className='title flex flex-col items-center h-[5%]'>
            <h4 className='text-3xl font-bold'>Settings</h4>
          </div>

          <div className='flex flex-col gap-3 items-center justify-center my-10 w-[100%] h-[20%]'>
            <IconInput
              type='text'
              placeholder='Username'
              value={loggedInUser?.username}
              icon={
                <FaRegUser className='w-5 h-5 absolute ml-3 pointer-events-none' />
              }
              disabled={true}
            />
            <IconInput
              type='text'
              placeholder='Role'
              value={loggedInUser?.role}
              icon={
                <FaUsersLine className='w-5 h-5 absolute ml-3 pointer-events-none' />
              }
              disabled={true}
            />
            <IconInput
              type='text'
              placeholder='Location'
              value={
                loggedInUser?.geolocationData?.city.name +
                ', ' +
                loggedInUser?.geolocationData?.country.name
              }
              icon={
                <FaLocationDot className='w-5 h-5 absolute ml-3 pointer-events-none' />
              }
              disabled={true}
            />
          </div>

          <div
            className='border-4 rounded-md'
            style={{ width: '100%', height: '50%' }}
          >
            <SettingsMap />
          </div>

          <div
            onClick={() => {
              navigate('/dashboard');
            }}
            className='h-[15%] flex items-center justify-center text-gray-600 cursor-pointer'
          >
            Back to Dashboard
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
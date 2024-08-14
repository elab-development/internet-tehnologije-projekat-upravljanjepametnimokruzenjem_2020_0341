import React from 'react';
import { useDashContext } from '../../hooks/useDashContext.hook';
import TempChanger from '../views_subcomponents/TempChanger';

const Temperature = () => {
  const { rooms } = useDashContext();

  return (
    <div className='my-10'>
      <div className='flex flex-row flex-wrap gap-4'>
        {rooms.map((room, idx) => (
          <TempChanger key={idx} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Temperature;
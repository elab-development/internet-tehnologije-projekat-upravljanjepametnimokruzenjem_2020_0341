import React from 'react';
import { useDashContext } from '../../hooks/useDashContext.hook';
import RoomCard from '../views_subcomponents/RoomCard';


const Light = () => {
  const { rooms } = useDashContext();

  return (
    <div className='my-10'>
      <div className='flex flex-row flex-wrap gap-4'>
        {rooms.map((room, idx) => (
          <RoomCard key={idx} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Light;
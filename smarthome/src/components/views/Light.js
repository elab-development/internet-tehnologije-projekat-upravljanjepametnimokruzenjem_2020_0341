import React, { useEffect, useState } from 'react';

import RoomCard from '../views_subcomponents/RoomCard';
import { getTypes } from '../../api/typeRequests';
import { getUtilitiesByType } from '../../api/utilityRequests';


const Light = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRoomsByType = async () => {
      const type = await getTypes('light');
      const typeId = type[0]._id;

      const utlities = await getUtilitiesByType(typeId);
      setRooms(utlities.data);
    };

    fetchRoomsByType();
  }, []);

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
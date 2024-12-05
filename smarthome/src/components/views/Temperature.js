import React, { useEffect, useState } from 'react';
import { getUtilitiesByType } from '../../api/utilityRequests';
import { getTypes } from '../../api/typeRequests';
import TempChanger from '../views_subcomponents/TempChanger';

const Temperature = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRoomsByType = async () => {
      const type = await getTypes('temperature');
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
          <TempChanger key={idx} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Temperature;
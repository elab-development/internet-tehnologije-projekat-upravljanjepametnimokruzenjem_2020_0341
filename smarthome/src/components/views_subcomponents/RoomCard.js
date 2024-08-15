import React, { useState } from 'react';
import { MdOutlineLightMode } from 'react-icons/md';
import dayjs from 'dayjs';

import { useDashContext } from '../../hooks/useDashContext.hook';

const RoomCard = ({ room }) => {
  const [lightToggle, setLightToggle] = useState(room.light);
  const { rooms, setRooms, allChanges, setAllChanges, loggedInUser } =
    useDashContext();

  const handleChange = () => {
    let changedRooms = rooms;
    changedRooms[room.id].light = !changedRooms[room.id].light;
    setRooms(changedRooms);
    setLightToggle(!lightToggle);

    let newChanges = allChanges;
    let utilityChange = lightToggle ? 'off' : 'on';
    newChanges.push({
      date: dayjs(new Date()).format('YYYY-MM-DD'),
      time: dayjs(new Date()).format('HH:mm:ss'),
      utility: 'light',
      user: loggedInUser.username,
      room: room.name,
      change: utilityChange,
    });
    setAllChanges(allChanges);
  };

  return (
    <div className='bg-white rounded-md w-80'>
      <div className='relative w-80'>
        <img
          src={require(`../../assets/rooms/${room.image}.png`)}
          alt={room.name}
          className={`rounded-md rounded-b-none w-80 ${
            !lightToggle ? 'opacity-75' : ''
          }`}
        />
        {!lightToggle && (
          <div className='absolute inset-0 bg-black bg-opacity-75 rounded-md rounded-b-none'></div>
        )}
      </div>
      <div className='my-2 p-4 flex flex-row justify-between items-center'>
        <h2 className='font-semibold'>{room.name}</h2>
        <div
          className={`md:w-14 md:h-7 w-12 h-6 flex items-center
            ${
              lightToggle ? 'bg-primary' : 'bg-gray-300'
            } rounded-full p-1 cursor-pointer
            `}
          onClick={handleChange}
        >
          <div
            className={`flex items-center justify-center ${
              lightToggle ? 'bg-secondary' : 'bg-white'
            } md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transition transform ${
              lightToggle ? ' translate-x-6' : ''
            }`}
          >
            <MdOutlineLightMode className='text-white' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
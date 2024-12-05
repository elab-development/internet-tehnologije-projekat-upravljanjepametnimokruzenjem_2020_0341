import React, { useState } from 'react';
import { MdOutlineLightMode } from 'react-icons/md';



import { updateUtility } from '../../api/utilityRequests';
import { useDashContext } from '../../hooks/useDashContext.hook';
import { createChange } from '../../api/changeRequests';

const RoomCard = ({ room }) => {
  const [lightToggle, setLightToggle] = useState(
    room.value === 'true' ? true : false
  );
  const { loggedInUser } = useDashContext();

  const handleChange = async () => {
    if (room.value === 'false') {
      setLightToggle(true);
      try {
        await updateUtility(room._id, { value: 'true' });
        await createChange({
          text: `${loggedInUser.username} turned on the lights in the ${room.room.name}`,
          utility: room._id,
          user: loggedInUser._id,
          date: new Date(),
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      setLightToggle(false);
      try {
        await updateUtility(room._id, { value: 'false' });
        await createChange({
          text: `${loggedInUser.username} turned off the lights in the ${room.room.name}`,
          utility: room._id,
          user: loggedInUser._id,
          date: new Date(),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className='bg-white rounded-md w-80'>
      <div className='relative w-80'>
        <img
          src={room.room.image}
          alt={room.room.name}
          className={`rounded-md rounded-b-none w-80 ${
            !lightToggle ? 'opacity-75' : ''
          }`}
        />
        {!lightToggle && (
          <div className='absolute inset-0 bg-black bg-opacity-75 rounded-md rounded-b-none'></div>
        )}
      </div>
      <div className='my-2 p-4 flex flex-row justify-between items-center'>
      <h2 className='font-semibold'>{room.room.name}</h2>
      {loggedInUser.role === 'child' ? (
          room.childrenAllowed && (
            <div
              className={`md:w-14 md:h-7 w-12 h-6 flex items-center
            ${lightToggle ? 'bg-primary' : 'bg-gray-300'} rounded-full p-1 cursor-pointer
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
          )
        ) : (
          <div
            className={`md:w-14 md:h-7 w-12 h-6 flex items-center
${lightToggle ? 'bg-primary' : 'bg-gray-300'} rounded-full p-1 cursor-pointer
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
        )}
      </div>
    </div>
  );
};

export default RoomCard;
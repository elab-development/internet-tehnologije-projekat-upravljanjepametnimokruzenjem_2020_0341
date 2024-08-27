import React, { useState } from 'react';
import { MdChildFriendly } from 'react-icons/md';
import { updateUtility } from '../../api/utilityRequests';

const PrivilegeCard = ({ utility }) => {
  const [allowed, setAllowed] = useState(utility.childrenAllowed);

  const handleChange = async () => {
    const current = allowed;
    setAllowed(!allowed);

    try {
      await updateUtility(utility._id, {
        childrenAllowed: !current,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-white rounded-md w-80'>
      <div className='relative w-80'>
        <img
          src={utility.room.image}
          alt={utility.room.name}
          className={`rounded-md rounded-b-none w-80`}
        />
      </div>
      <div className='my-2 p-4 flex flex-row justify-between items-center'>
        <h2 className='font-semibold capitalize'>
          {utility.type.name} in {utility.room.name}
        </h2>

        <div
          className={`md:w-14 md:h-7 w-12 h-6 flex items-center
   ${allowed ? 'bg-primary' : 'bg-gray-300'} rounded-full p-1 cursor-pointer
   `}
          onClick={handleChange}
        >
          <div
            className={`flex items-center justify-center ${
              allowed ? 'bg-secondary' : 'bg-white'
            } md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transition transform ${
              allowed ? ' translate-x-6' : ''
            }`}
          >
            <MdChildFriendly className='text-white' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivilegeCard;
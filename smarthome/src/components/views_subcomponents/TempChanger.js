import React, { useState } from 'react';
import { TfiSave } from 'react-icons/tfi';

import { temperatureData } from '../../utils/data';
import { updateUtility } from '../../api/utilityRequests';
import { useDashContext } from '../../hooks/useDashContext.hook';

const TempChanger = ({ room }) => {
  const [currentTemp, setCurrentTemp] = useState(parseInt(room.value));
  const [changed, setChanged] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { loggedInUser } = useDashContext();

  const handleChange = (e) => {
    setCurrentTemp(e.target.value);
    setChanged(true);
  };
  };

  const handleDragStart = (e) => {
    let changedRooms = rooms;
    changedRooms[room.id].temperature = e.currentTarget.value;
    setRooms(changedRooms);
    setIsDragging(false);

    const handleUpdateTemp = async () => {
      try {
        const tempStr = currentTemp.toString();
        await updateUtility(room._id, { value: tempStr });
        setChanged(false);
      } catch (error) {
        console.error(error);
      }
  };

  const handleDragEnd = (e) => {
    setCurrentTemp(e.currentTarget.value);
    setIsDragging(false);
    setChanged(true);
  };

  return (
    <div className='flex gap-1'>
    <div className='flex justify-between items-center w-80 bg-tertiary p-2 rounded-md'>
      <div className='flex flex-col'>
        <h2 className='font-semibold'>{room.room.name}</h2>
      </div>
      <div className='relative bg-white flex items-center rounded'>
        <input
          type='range'
          min={temperatureData.min}
          max={temperatureData.max}
          value={currentTemp}
          onChange={handleChange}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          className='range-slider'
          style={{ zIndex: isDragging ? 1 : 2 }}
          disabled={
            loggedInUser.role === 'child'
              ? room.childrenAllowed
                ? false
                : true
              : false
          }
        />
        {/* <div className='absolute h-full bg-tertiary rounded w-[70%]'></div> */}
        <div
          className='absolute h-full bg-secondary rounded'
          style={{
            width:
              ((currentTemp - temperatureData.min) * 100) /
                (temperatureData.max - temperatureData.min) +
              '%',
          }}
        ></div>
        <div className='absolute h-full font-semibold flex items-center justify-center rounded w-full'>
          <span
            className={`${currentTemp < 23 ? 'text-black' : 'text-white'} `}
          >
            {currentTemp}
          </span>
          <span
            className={`${currentTemp < 25 ? 'text-black' : 'text-white'} `}
          >
            °C
          </span>
        </div>
        </div>
      </div>
      {changed && (
        <button
          type='button'
          onClick={handleUpdateTemp}
          className='bg-primary text-white px-6 py-2 text-2xl font-bold rounded-md'
        >
          <TfiSave />
        </button>
      )}
    </div>
  );
};

export default TempChanger;
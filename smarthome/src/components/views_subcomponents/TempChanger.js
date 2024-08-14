import React, { useState } from 'react';

import { temperatureData } from '../../utils/data';
import { useDashContext } from '../../hooks/useDashContext.hook';

const TempChanger = ({ room }) => {
  const [currentTemp, setCurrentTemp] = useState(room.temperature);
  const [isDragging, setIsDragging] = useState(false);
  const { rooms, setRooms } = useDashContext();

  const handleChange = (e) => {
    setCurrentTemp(e.target.value);
    let changedRooms = rooms;
    changedRooms[room.id].temperature = e.target.value;
    setRooms(changedRooms);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
  };

  const handleDragEnd = (e) => {
    setCurrentTemp(e.currentTarget.value);
    let changedRooms = rooms;
    changedRooms[room.id].temperature = e.currentTarget.value;
    setRooms(changedRooms);
    setIsDragging(false);
  };

  return (
    <div className='flex justify-between items-center w-80 bg-tertiary p-2 rounded-md'>
      <div className='flex flex-col'>
        <h2 className='font-semibold'>{room.name}</h2>
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
  );
};

export default TempChanger;
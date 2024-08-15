import React from 'react';

const ChangeRow = ({ change }) => {
  return (
    <div className='bg-slate-200 rounded flex items-center gap-4 w-full'>
      <div className='flex flex-col font-bold bg-secondary p-2 rounded text-white'>
        <p>{new Date(change.date).toDateString()} </p>
        <p>{change.time} </p>
      </div>
      <div>
        <span className='font-semibold capitalize'>{change.user}</span>{' '}
        {change.utility === 'light' && (
          <span>turned {change.change} the lights in the </span>
        )}
        {change.utility === 'temperature' && (
          <span>changed the temperature to {change.change} in the </span>
        )}
        <span className='font-semibold'>{change.room}</span>
      </div>
    </div>
  );
};

export default ChangeRow;
import React from 'react';

const ChangeRow = ({ change }) => {
  return (
    <div className='bg-slate-200 rounded flex items-center gap-4 w-full'>
      <div className='flex flex-col font-bold bg-secondary p-2 rounded text-white'>
      <p>{new Date(change.date).toLocaleDateString()} </p>
      {new Date(change.date).toLocaleTimeString()}
      </div>
      <div>
      <span className='font-semibold'>{change.text}</span>{' '}
      </div>
    </div>
  );
};

export default ChangeRow;
import React from 'react';

const IconInput = ({ type, placeholder, icon, value, disabled }) => {
  return (
    <div className='w-full relative flex items-center text-gray-400 focus-within:text-gray-600'>
      {icon}
      <input
        className='w-full pr-3 pl-10 py-2 placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2'
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};

export default IconInput;
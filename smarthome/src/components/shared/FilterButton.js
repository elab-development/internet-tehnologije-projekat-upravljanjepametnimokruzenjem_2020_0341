import React from 'react';

const FilterButton = ({ filter, handleClick, icon, text, width }) => {
  return (
    <div
      className={`border w-${width} py-1 px-4 rounded-full flex cursor-pointer justify-between items-center shadow-md hover:shadow-lg
      ${filter ? 'text-white bg-primary' : 'text-black bg-transparent'}
  `}
      onClick={handleClick}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default FilterButton;
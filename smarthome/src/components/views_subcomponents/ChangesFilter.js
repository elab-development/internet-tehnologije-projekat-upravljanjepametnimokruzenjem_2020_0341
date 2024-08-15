import React, { useEffect, useState } from 'react';
import { FaTemperatureHalf } from 'react-icons/fa6';
import { MdOutlineLightMode } from 'react-icons/md';
import FilterButton from '../shared/FilterButton';

const ChangesFilter = ({ updateFilter }) => {
  const [lightsFilter, setLightsFilter] = useState(true);
  const [temperatureFilter, setTemperatureFilter] = useState(true);

  useEffect(() => {
    updateFilter(lightsFilter, temperatureFilter);
  }, [lightsFilter, temperatureFilter]);

  return (
    <div className='flex flex-wrap gap-4'>
      <FilterButton
        filter={lightsFilter}
        handleClick={() => {
          setLightsFilter(!lightsFilter);
        }}
        icon={<MdOutlineLightMode />}
        text={'Light Changes'}
        width={40}
      />
      <FilterButton
        filter={temperatureFilter}
        handleClick={() => {
          setTemperatureFilter(!temperatureFilter);
        }}
        icon={<FaTemperatureHalf />}
        text={'Temperature Changes'}
        width={56}
      />
    </div>
  );
};

export default ChangesFilter;
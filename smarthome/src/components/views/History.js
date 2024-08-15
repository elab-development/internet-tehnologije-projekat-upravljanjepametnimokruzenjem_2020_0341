import React, { useEffect, useState } from 'react';

import { useDashContext } from '../../hooks/useDashContext.hook';
import ChangesFilter from '../views_subcomponents/ChangesFilter';
import ChangeRow from '../views_subcomponents/ChangeRow';

const History = () => {
  const [filterFlag, setFilterFlag] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState([]);
  const { allChanges, filteredChanges, setFilteredChanges } = useDashContext();

  const filterData = (lightsFilter, temperatureFilter) => {
    let newFiltered = allChanges;

    if (lightsFilter && temperatureFilter) {
      setFilteredChanges(allChanges);
      return;
    }

    if (lightsFilter) {
      newFiltered = newFiltered.filter((change) => change.utility === 'light');
    } else {
      newFiltered = newFiltered.filter((change) => change.utility !== 'light');
    }

    if (temperatureFilter) {
      newFiltered = newFiltered.filter(
        (change) => change.utility === 'temperature'
      );
    } else {
      newFiltered = newFiltered.filter(
        (change) => change.utility !== 'temperature'
      );
    }

    setFilteredChanges(newFiltered);
  };

  useEffect(() => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(filteredChanges?.length / 10); i++) {
      pages.push(i);
    }
    setPagesArray(pages);
    setCurrentPage(1);
  }, [filteredChanges]);

  return (
    <div className='flex flex-col gap-4'>
      <ChangesFilter
        updateFilter={(lightsFilter, temperatureFilter) => {
          setFilterFlag(!filterFlag);
          filterData(lightsFilter, temperatureFilter);
        }}
      />
      <div className='flex flex-wrap gap-2'>
        {filteredChanges
          .slice(currentPage * 10 - 10, currentPage * 10)
          .map((change, idx) => (
            <ChangeRow key={idx} change={change} />
          ))}
      </div>
      {filteredChanges?.length === 0 && (
        <div className='flex items-center justify-center'>
          <p>No data for this filter!</p>
        </div>
      )}
      <div className='flex gap-1'>
        {pagesArray.map((page) => (
          <div
            key={page}
            className='px-4 py-2 bg-secondary text-white rounded cursor-pointer'
            style={{
              backgroundColor: page === currentPage ? '#135993' : '#588bc9',
            }}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
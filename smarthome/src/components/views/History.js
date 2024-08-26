import React, { useEffect, useState } from 'react';

import ChangeRow from '../views_subcomponents/ChangeRow';
import { getChanges } from '../../api/changeRequests';

const History = () => {
  const [changes, setChanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesArray, setPagesArray] = useState([]);
  

  useEffect(() => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(changes?.length / 10); i++) {
      pages.push(i);
    }
    setPagesArray(pages);
    setCurrentPage(1);
  }, [changes]);

  useEffect(() => {
    const fetchChanges = async () => {
      try {
        const res = await getChanges();
        setChanges(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChanges();
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      
      <div className='flex flex-wrap gap-2'>
      {changes
          .slice(currentPage * 10 - 10, currentPage * 10)
          .map((change, idx) => (
            <ChangeRow key={idx} change={change} />
          ))}
      </div>
      
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
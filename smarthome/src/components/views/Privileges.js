import React, { useEffect, useState } from 'react';
import { getUtilities } from '../../api/utilityRequests';
import PrivilegeCard from '../views_subcomponents/PrivilegeCard';

const Privileges = () => {
  const [utilities, setUtilities] = useState([]);

  useEffect(() => {
    const fetchAllUtilities = async () => {
      const res = await getUtilities();
      setUtilities(res.data);
    };

    fetchAllUtilities();
  }, []);

  return (
    <div className='my-10'>
      <h1 className='text-3xl font-bold mb-4'>Manage Privileges</h1>

      <div className='flex flex-row flex-wrap gap-4'>
        {utilities.map((utility) => (
          <PrivilegeCard key={utility._id} utility={utility} />
        ))}
      </div>
    </div>
  );
};

export default Privileges;
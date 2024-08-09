import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdLogin } from 'react-icons/md';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center h-screen flex-col bg-background '>
      <div className='bg-white bg-opacity-15 p-10 flex flex-col justify-center items-center gap-4 rounded-md'>
        <h2 className='text-3xl text-white font-semibold'>
          Smart Home Assistant
        </h2>
        <div
          onClick={() => navigate('/username')}
          className='flex flex-row items-center gap-2 cursor-pointer bg-primary py-2 px-4 font-semibold rounded-lg text-white
          border-none border-white hover:border-[#135993] hover:border-2 hover:text-[#135993] hover:bg-white '
        >
          <span>Go to Dashboard</span>
          <MdLogin />
        </div>
      </div>
    </div>
  );
};

export default Home;
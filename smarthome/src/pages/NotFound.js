import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className='h-screen w-full flex flex-col justify-center items-center bg-[#135993]'>
      <h1 className='text-9xl font-extrabold text-white tracking-widest'>
        404
      </h1>
      <div className='bg-[#dca11d] px-2 text-sm rounded rotate-12 absolute'>
        Page Not Found
      </div>
      <Link
        to={'/'}
        className='mt-5 relative inline-block text-sm font-medium text-[#dca11d] group active:text-[#dca11d] focus:outline-none focus:ring'
      >
        <span className='absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#dca11d] group-hover:transalte-y-0 group-hover:translate-x-0'></span>
        <span className='relative block px-8 py-3 bg-[#135993] border border-current'>
          Return Home
        </span>
      </Link>
    </main>
  );
};

export default NotFound;
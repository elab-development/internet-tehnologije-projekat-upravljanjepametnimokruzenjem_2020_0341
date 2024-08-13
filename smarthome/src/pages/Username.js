import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import logo from '../assets/logo.png';
import { useDashContext } from '../hooks/useDashContext.hook';
import { getLocationFromIP } from '../utils/geolocationAPI';

const Username = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { setLoggedInUser } = useDashContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      toast.error(<b>Username is required!</b>, { id: 'login' });
      return;
    }
    const data = await getLocationFromIP();
    setLoggedInUser({
      username: username,
      city: data.city.name,
      geolocationData: data,
    });


    navigate('/dashboard');
  };

  return (
    <div className='bg-primary'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className='glass'>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Welcome Back!</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Log In to Access your Smart Home Dashboard
            </span>
          </div>

          <form
            className='py-1 flex flex-col items-center'
            onSubmit={handleSubmit}
          >
            <div className='profile flex justify-center py-4'>
              <img src={logo} alt='avatar' className='profile_img' />
            </div>

            <div className='textbox flex flex-col items-center gap-6'>
              <input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='textbox'
              />
              <button type='submit' className='btn'>
                Login
              </button>
            </div>

            <div className='text-center py-4'>
              <span className='text-gray-500'>
                Haven't signed up yet?{' '}
                <Link to='/username' className='text-red-500'>
                  Register Now!
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Username;
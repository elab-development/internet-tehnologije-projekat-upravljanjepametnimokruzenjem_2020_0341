import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';

import styles from '../styles/Username.module.css';
import logo from '../assets/logo.png';
import { passwordValidate } from '../utils/validate';
import { useFetch } from '../hooks/useFetch.hook';
import { useAuthStore } from '../store/store';
import { loginUser, getUser } from '../api/authRequests';
import Loader from '../components/shared/Loader';

const Password = () => {
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(
    `auth/users/${username}`
  );

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginPromise = loginUser({ username, password: values.password });

      toast.promise(loginPromise, {
        loading: 'Checking your credentials...',
        success: <b>Welcome, {username}!</b>,
        error: <b>Wrong credentials!</b>,
      });

      loginPromise
        .then((res) => {
          let { token } = res.data;
          localStorage.setItem('token', token);
          navigate('/dashboard');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  useEffect(() => {
    const getUsersData = async () => {
      let usersData = await getUser({ username });
      setVerified(usersData.data.verified);
    };

    if (username) {
      getUsersData();
    }
  }, [username]);

  if (serverError)
    return <h1 className='text-3xl text-red-500'>{serverError.message}</h1>;

  return (
    <div className='bg-primary'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>
              Hello, {apiData?.firstName || apiData?.username || username}!
            </h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter your password to begin.
            </span>
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <>
              <form className='py-1' onSubmit={formik.handleSubmit}>
                <div className='profile flex justify-center py-4'>
                  <img src={logo} alt='logo' className={styles.profile_img} />
                </div>

                <div className='textbox flex flex-col items-center gap-6'>
                  <input
                    type='password'
                    placeholder='Password'
                    {...formik.getFieldProps('password')}
                    className={styles.textbox}
                  />
                  <button
                    type='submit'
                    className={styles.btn}
                    disabled={!verified}
                  >
                    Sign In!
                  </button>
                </div>

                {verified ? (
                  <div className='text-center py-4'>
                    <span className='text-gray-500'>
                      Forgot Password?{' '}
                      <Link to='/recovery' className='text-red-500'>
                        Recover Now
                      </Link>
                    </span>
                  </div>
                ) : (
                  <div className='text-center py-4'>
                    <span className='text-red-500'>
                      Your account has not been verified yet! Please try again
                      later.
                    </span>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Password;
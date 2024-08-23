import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import styles from '../styles/Username.module.css';
import profileStyles from '../styles/Profile.module.css';
import logo from '../assets/logo.png';
import { profileValidate } from '../utils/validate';
import { useFetch } from '../hooks/useFetch.hook';
import { updateUser } from '../api/authRequests';
import { app } from '../utils/firebaseApp';
import Loader from '../components/shared/Loader';

const Profile = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [{ isLoading, apiData, serverError }] = useFetch();

  useEffect(() => {
    const handleUploadImage = async () => {
      try {
        setError(null);

        if (!file) {
          setError('Please select and image!');
          return;
        }

        // Getting Firebase Storage based on our app and creating image ref
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            setError(
              'Could not upload image (File must be an image of the size less than 2MB)'
            );
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setError(null);
              setFileUrl(downloadURL);
            });
          }
        );
      } catch (error) {
        setError('Image uploading failed!');
        console.error(error);
      }
    };

    if (file) {
      handleUploadImage();
    }
  }, [file]);

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      username: apiData?.username || '',
      email: apiData?.email || '',
    },
    enableReinitialize: true,
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = Object.assign(values, {
        profileImg: fileUrl || apiData?.profileImg || '',
      });
      let updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: 'Updating profile information...',
        success: <b>Updated profile information!</b>,
        error: <b>Something went wrong!</b>,
      });
    },
  });

  if (serverError)
    return <h1 className='text-3xl text-red-500'>{serverError.message}</h1>;

  return (
    <div className='bg-primary'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div
          className={`${styles.glass} ${profileStyles.glass}`}
          style={{ width: '45%', paddingTop: '3em' }}
        >
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Profile Settings</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Edit your Information
            </span>
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                <label htmlFor='profile'>
                  <img
                    src={fileUrl || apiData?.profileImg || logo}
                    alt='logo'
                    className={`${styles.profile_img} ${profileStyles.profile_img}`}
                  />
                </label>
                <input
                  type='file'
                  id='profile'
                  name='profile'
                  accept='image/*'
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              {error && <span className='text-red-500'>{error}</span>}

              <div className='textbox flex flex-col items-center gap-6'>
                <div className='name flex w-3/4 gap-10'>
                  <input
                    type='text'
                    placeholder='First Name'
                    {...formik.getFieldProps('firstName')}
                    className={`${styles.textbox} ${profileStyles.textbox}`}
                  />
                  <input
                    type='text'
                    placeholder='Last Name'
                    {...formik.getFieldProps('lastName')}
                    className={`${styles.textbox} ${profileStyles.textbox}`}
                  />
                </div>
                <input
                  type='text'
                  placeholder='Email'
                  disabled
                  {...formik.getFieldProps('email')}
                  className={`${styles.textbox} ${profileStyles.textbox}`}
                />
                <input
                  type='text'
                  placeholder='Username'
                  disabled
                  {...formik.getFieldProps('username')}
                  className={`${styles.textbox} ${profileStyles.textbox}`}
                />

                <button type='submit' className={styles.btn}>
                  Update Details
                </button>
              </div>

              <div className='text-center mt-10'>
                <span
                  onClick={() => navigate('/dashboard')}
                  className='text-gray-500 cursor-pointer'
                >
                  Back to Dashboard
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
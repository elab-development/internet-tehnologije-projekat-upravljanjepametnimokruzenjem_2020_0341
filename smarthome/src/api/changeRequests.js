import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

// Create Change
export const createChange = async (data) => {
  const token = localStorage.getItem('token');
  try {
    return await axios.post('/api/changes', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return { error: error.message };
  }
};

// Get All Changes
export const getChanges = async () => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios.get('/api/changes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

// Delete Change
export const deleteChange = async (changeId) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.delete(`/api/changes/${changeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve({ res });
  } catch (error) {
    return { error: error.message };
  }
};
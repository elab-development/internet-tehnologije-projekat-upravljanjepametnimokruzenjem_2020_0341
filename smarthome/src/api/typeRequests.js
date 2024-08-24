import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

// Create Type
export const createType = async (data) => {
  const token = localStorage.getItem('token');
  try {
    return await axios.post('/api/types', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return { error: error.message };
  }
};

// Get All Types
export const getTypes = async () => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios.get('/api/types', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

// Get Single Type
export const getType = async (typeId) => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios.get(`/api/types/${typeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};
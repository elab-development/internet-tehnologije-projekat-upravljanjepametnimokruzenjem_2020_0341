import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

// Create Utility
export const createUtility = async (data) => {
  const token = localStorage.getItem('token');
  try {
    return await axios.post('/api/utilities', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return { error: error.message };
  }
};

// Get All Utilities
export const getUtilities = async () => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios.get('/api/utilities', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

// Get All Utilities By Type
export const getUtilitiesByType = async (typeId) => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios.get(`/api/utilities/byType/${typeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

// Get All Utilities By Room
export const getUtilitiesByRoom = async (roomId) => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios.get(`/api/utilities/byRoom/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

// Get Single Utility
export const getUtility = async (utilityId) => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios.get(`/api/utilities/${utilityId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

// Update Utility
export const updateUtility = async (utilityId, updateData) => {
  const token = localStorage.getItem('token');
  try {
    const data = await axios.put(`/api/utilities/${utilityId}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return { error: error.message };
  }
};

// Delete Utility
export const deleteUtility = async (utilityId) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.delete(`/api/utilities/${utilityId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve({ res });
  } catch (error) {
    return { error: error.message };
  }
};
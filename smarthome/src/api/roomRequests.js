import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

// Create Room
export const createRoom = async (data) => {
  const token = localStorage.getItem('token');
  try {
    return await axios.post('/api/rooms', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return { error: error.message };
  }
};

// Get All Rooms
export const getRooms = async () => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios.get('/api/rooms', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

// Get Single Room
export const getRoom = async (roomId) => {
  const token = localStorage.getItem('token');
  try {
    const { data } = await axios.get(`/api/rooms/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

// Update Room
export const updateRoom = async (roomId, updateData) => {
  const token = localStorage.getItem('token');
  try {
    const data = await axios.put(`/api/rooms/${roomId}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve({ data });
  } catch (error) {
    return { error: error.message };
  }
};

// Delete Room
export const deleteRoom = async (roomId) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.delete(`/api/rooms/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Promise.resolve({ res });
  } catch (error) {
    return { error: error.message };
  }
};
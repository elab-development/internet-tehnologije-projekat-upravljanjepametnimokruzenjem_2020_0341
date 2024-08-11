import axios from 'axios';

const geolocationAPIKey = process.env.REACT_APP_GEOLOCATION_KEY;

export const getLocationFromIP = async () => {
  try {
    const res = await axios.get(
      `https://api.geoapify.com/v1/ipinfo?&apiKey=${geolocationAPIKey}`
    );
    return res.data.city.name;
  } catch (error) {
    console.error(error);
  }
};
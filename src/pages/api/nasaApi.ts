// lib/nasaApi.ts
import axios from 'axios';

const NASA_API_KEY='UPsmxUohBPV4gWsXSg8rHd30Hm5ebg6zgkbZ2q8i';
const NEO_API_URL = `https://api.nasa.gov/neo/rest/v1/feed`;

export const fetchNearEarthObjects = async (startDate: string, endDate: string) => {
  try {
    const response = await axios.get(NEO_API_URL, {
      params: {
        start_date: startDate,
        end_date: endDate,
        api_key: NASA_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching NEO data:', error);
    throw error;
  }
};

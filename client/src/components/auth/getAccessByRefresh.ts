import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAccessByRefresh = async () => {
  const storedRefreshToken = localStorage.getItem('refreshToken');
  if (!storedRefreshToken) return null;

  try {
    const response = await axios.post(`${BASE_URL}/auth/refresh`, null, {
      headers: {
        'Content-Type': 'application/json',
        Refresh: storedRefreshToken,
      },
      withCredentials: true,
    });

    const newAccessTokenWithBearer = response.headers.authorization;
    const newAccessToken = newAccessTokenWithBearer.split(' ')[1];
    return newAccessToken;
  } catch (error) {
    return null;
  }
};

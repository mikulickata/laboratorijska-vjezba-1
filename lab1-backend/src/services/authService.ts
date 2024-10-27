import axios from 'axios';
import dotenv from 'dotenv';
import asyncErrorHandler from '../utils/asyncErrorHandler';

dotenv.config();

let oauthToken: string = ''; // Inicijalizacija sa praznim stringom

export const getOAuthToken = async (): Promise<string> => {
  if (oauthToken) return oauthToken;

  try {
    const response = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
      grant_type: 'client_credentials',
      client_id: process.env.AUTH0_M2M_CLIENT_ID,
      client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
      audience: process.env.AUTH0_M2M_AUDIENCE,
    });

    oauthToken = response.data.access_token;
    console.log('Access Token:', oauthToken);
    return oauthToken;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw new Error('Failed to fetch access token');
  }
};


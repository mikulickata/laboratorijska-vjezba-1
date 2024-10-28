import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

let oauthToken: string = ''; 

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
    return oauthToken;
  } catch (error) {
    throw new Error('Failed to fetch access token');
  }
};


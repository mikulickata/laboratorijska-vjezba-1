import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;

export const authConfig = {
  authRequired: false,
  idpLogout: true, // Enables logout from the identity provider
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL, // koristi BASE_URL iz .env
  clientID: process.env.AUTH0_WEB_CLIENT_ID, // Use web client ID
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`, // Set issuer URL
  clientSecret: process.env.AUTH0_WEB_CLIENT_SECRET, // Use web client secret
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email', // If you want additional user information
  },
};

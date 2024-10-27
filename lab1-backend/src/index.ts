import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS
import ticketRoutes from './routes/ticketRoutes';
import { getOAuthToken } from './services/authService';
import { authConfig } from './config/authConfig';
import { auth } from 'express-openid-connect';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:3000', // Adjust this URL to match your frontend's URL
}));

app.use(express.json());

// Configuration for OIDC middleware
app.use(auth(authConfig));

// Start the application and get OAuth token
/*
const initApp = async () => {
  try {
    await getOAuthToken(); // Get the token
    console.log('OAuth token je uspješno dobiven');
  } catch (error) {
    console.error('Greška prilikom dobivanja OAuth tokena:', error);
  }
};
*/
// Main routes for tickets
app.use('/tickets', ticketRoutes);

app.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`);
  //initApp(); // Initialize the application
});

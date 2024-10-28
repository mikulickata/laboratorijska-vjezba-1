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
  origin: 'https://lab1-frontend.onrender.com', // Zamijenite s točnom domenom frontend aplikacije
  methods: 'GET,POST', // Dozvolite samo potrebne metode
  allowedHeaders: 'Content-Type,Authorization', // Dozvolite potrebne zaglavlje
  credentials: true
}));


app.use(express.json());

// Configuration for OIDC middleware
app.use(auth(authConfig));


// Main routes for tickets
app.use('/tickets', ticketRoutes);

app.listen(PORT, () => {});

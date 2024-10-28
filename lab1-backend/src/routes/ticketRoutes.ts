import express from 'express';
import { createTicket, getTicket, getTicketCount } from '../controllers/ticketController';
import checkOAuthToken from '../middleware/authMiddleware';
import { requiresAuth } from 'express-openid-connect';
import asyncErrorHandler from '../utils/asyncErrorHandler';

const router = express.Router();

// Početna ruta za prikaz broja dosad generiranih ulaznica
router.get('/count', getTicketCount);

// Ruta za generiranje ulaznice, koristi OAuth2 autorizaciju
router.post('/generate', asyncErrorHandler(checkOAuthToken), asyncErrorHandler(createTicket));

// Ruta za dohvaćanje detalja ulaznice, koristi OIDC autorizaciju
router.get('/:id', requiresAuth(), getTicket); 

export default router;

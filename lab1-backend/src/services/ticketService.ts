import { v4 as uuidv4 } from 'uuid';
import pool from '../database/database';
import { generateQRCode } from './qrCodeService';

export const generateTicket = async (vatin: string, firstName: string, lastName: string) => {

  const id = uuidv4();
  const ticketUrl = `${process.env.BASE_URL}/tickets/${id}`;  // Generate the ticket URL dynamically

  const result = await pool.query('SELECT COUNT(*) FROM tickets WHERE vatin = $1', [vatin]);
  if (parseInt(result.rows[0].count) >= 3) {
     throw { statusCode: 400, message: 'Maksimalan broj ulaznica je već generiran za ovaj OIB' };
  }

  const query = 'INSERT INTO tickets (id, vatin, first_name, last_name, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *';
  const values = [id, vatin, firstName, lastName];
  const newTicket = await pool.query(query, values);

  const qrCodeUrl = await generateQRCode(ticketUrl); // Generate the QR code

  return { ticketUrl, qrCodeUrl}; // Include QR code URL in the response
};

export const getTicketDetails = async (id: string) => {
  const result = await pool.query('SELECT * FROM tickets WHERE id = $1', [id]);

  if (result.rows.length === 0) {
    throw { statusCode: 404, message: 'Ulaznica nije pronađena' };
  }

  return result.rows[0];
};

export const getTotalTicketCount = async () => {
  const result = await pool.query('SELECT COUNT(*) FROM tickets');
  return parseInt(result.rows[0].count);
};

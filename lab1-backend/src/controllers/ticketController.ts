import { Request, Response } from 'express';
import { generateTicket, getTicketDetails, getTotalTicketCount } from '../services/ticketService';
import pool from '../database/database';


export const createTicket = async (req: Request, res: Response) => {
  const { vatin, firstName, lastName } = req.body;
  const token = req.access_token; // Uzimanje tokena iz req objekta

  // Validacija ulaznih podataka
  if (!vatin || !firstName || !lastName) {
    return res.status(400).json({ message: 'Svi podaci (vatin, firstName, lastName) su obavezni.' });
  }

  try {
    // Provjera broja kupljenih ulaznica za OIB
    const result = await pool.query(
      'SELECT COUNT(*) FROM tickets WHERE vatin = $1',
      [vatin]
    );
    
    const rowCount = parseInt(result.rows[0]?.count) || 0; // Osiguravanje da je rowCount broj

    if (rowCount >= 3) {
      return res.status(400).json({ message: 'Već ste kupili 3 ulaznice za navedeni OIB.' });
    }

    // Proslijedite token funkciji generateTicket
    const ticket = await generateTicket(vatin, firstName, lastName); 
    res.status(201).json({ ticket });
  } catch (error: any) {
    // Vratite status 500 s opisom pogreške
    res.status(error.statusCode || 500).json({ message: error.message || 'Došlo je do pogreške prilikom stvaranja ulaznice.' });
  }
};



// Prikaz broja generiranih ulaznica
export const getTicketCount = async (req: Request, res: Response) => {
  try {
    const count = await getTotalTicketCount();
    res.status(200).json({ count });
  } catch (error: any) {
    res.status(500).json({ message: 'Greška prilikom dohvaćanja broja ulaznica', error });
  }
};

// Prikaz detalja ulaznice
export const getTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userName = req.oidc.user?.name;  // Dohvaća podatke o prijavljenom korisniku // Prikazuje podatke korisnika

  try {
    const ticket = await getTicketDetails(id);
    res.status(200).json({
      ticket,
      userName
    });
  } catch (error: any) {
    res.status(error.statusCode || 404).json({ message: error.message });
  }
};

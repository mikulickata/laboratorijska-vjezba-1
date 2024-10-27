import { Request, Response } from 'express';
import { generateTicket, getTicketDetails, getTotalTicketCount } from '../services/ticketService';
import { generateQRCode } from '../services/qrCodeService';

export const createTicket = async (req: Request, res: Response) => {
  console.log("createTicket")
  const { vatin, firstName, lastName } = req.body;
  const token = req.access_token; // Uzimanje tokena iz req objekta
  console.log("v, fn, ln", req.body, vatin, firstName, lastName);
  console.log("OAuth Token:", token); // Ovdje možete provjeriti token

  try {
      // Proslijedite token funkciji generateTicket
      const ticket = await generateTicket(vatin, firstName, lastName, token); 
      console.log("ticket-generated: ", ticket);
      res.status(201).json({ ticket });
  } catch (error: any) {
      res.status(error.statusCode || 500).json({ message: error.message });
  }
};



// Prikaz broja generiranih ulaznica
export const getTicketCount = async (req: Request, res: Response) => {
  console.log("getTicketCount")
  try {
    const count = await getTotalTicketCount();
    res.status(200).json({ count, message: `Broj generiranih ulaznica: ${count}` });
  } catch (error: any) {
    res.status(500).json({ message: 'Greška prilikom dohvaćanja broja ulaznica', error });
  }
};

// Prikaz detalja ulaznice
export const getTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("id: ", id)
  try {
    const ticket = await getTicketDetails(id);
    //const user = req.oidc.user;
    console.log("sve: ", ticket)
    res.status(200).json({ ticket});
  } catch (error: any) {
    res.status(error.statusCode || 404).json({ message: error.message });
  }
};

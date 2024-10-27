import { Request, Response, NextFunction } from 'express';
import { getOAuthToken } from '../services/authService';

// Middleware za provjeru OAuth2 tokena za generiranje ulaznica
const checkOAuthToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = await getOAuthToken(); // Get token from memory
        console.log("check");
        console.log(token);

        // Provjera postoji li token
        if (!token) {
            res.status(401).json({ message: 'Token nije dostavljen' });
            return; // Prekida daljnje izvršavanje
        }

        req.access_token = token; // Postavljanje tokena u req objekat

        // Ako token postoji, nastavi dalje
        console.log("izlazim")
        next();
    } catch (error) {
        console.error("Error fetching token:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default checkOAuthToken;

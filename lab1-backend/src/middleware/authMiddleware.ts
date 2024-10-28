import { Request, Response, NextFunction } from 'express';
import { getOAuthToken } from '../services/authService';


const checkOAuthToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = await getOAuthToken(); 
        if (!token) {
            res.status(401).json({ message: 'Token nije dostavljen' });
            return;
        }

        req.access_token = token; 

        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default checkOAuthToken;

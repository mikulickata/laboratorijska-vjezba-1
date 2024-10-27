// In your authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Replace this with your actual user authentication logic
    if (username === 'yourUsername' && password === 'yourPassword') {
        const payload = { id: 1, username }; // Add user details as needed
        const token = jwt.sign(payload, process.env.AUTH0_CLIENT_SECRET as string, { expiresIn: '2h' });
        return res.json({ token });
    } else {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
};

export { login };

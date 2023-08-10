import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const secretKey = process.env.JWT_SECRET!;
        console.log(req.body,"bodo");
        const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Authorization token missing' });
        }
        const decodedToken = jwt.verify(token, secretKey) as { userId: string };

        const user = await User.findById(decodedToken.userId);
        console.log(user,"userrrrr");
        res.status(200).json({ message: 'your product is on the way' });
    } catch (error) {
        
    }
}
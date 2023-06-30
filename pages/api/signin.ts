import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt, { Secret } from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password } = req.body;

    console.log(req.body,"resss");
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Incorrrect Email Address' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrrect password' });
    }

    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h', 
    });

    console.log(token,"tototoo");
    res.status(200).json({ token });
    res.status(200).json({sucess:"All good"})
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}

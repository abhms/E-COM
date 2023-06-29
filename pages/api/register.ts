import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/User';

const secretKey = 'your-secret-key'; // Replace with your secret key

export default async function signupHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, email, password } = req.body;

    const match = await User.findOne({ email });
    if (match) {
      return res.status(409).send('User already exists');
    }

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hash,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, secretKey, {
      expiresIn: '1h',
    });

    res.setHeader('Set-Cookie', `token=${token}; HttpOnly`);

    res.status(200).json({ message: 'User created successfully' ,token});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}

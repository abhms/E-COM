import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt, { Secret } from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Retrieve the username and password from the request body
    const { email, password } = req.body;

    // Find the user in the database
    console.log(req.body,"resss");
    const user = await User.findOne({ email });

    // If the user does not exist, return an error
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the passwords do not match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    
    console.log(process.env.JWT_SECRET,"process.env.JWT_SECRET");
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: '1h', // Token expiration time
    // });

    // Return the token in the response
    // console.log(token,"tototoo");
    // res.status(200).json({ token });
    res.status(200).json({sucess:"All good"})
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}

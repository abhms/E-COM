import { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../models/Product';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../../../models/User';
import Cart from '../../../models/Cart';
export default async function addCart(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    const {productId}=req.body;
    const secretKey = process.env.JWT_SECRET!;
    const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies.token;
    if (!token || token.length <=4) { // Fix the condition here (negate the check)
      return res.status(200).json({ message: 'You are not login' });
    }
    console.log(token,"tokekek");

    const decodedToken = jwt.verify(token, secretKey) as { userId: string };
    // Change type to unknown

    // Check if the decoded token is an object and has a 'userId' property
    if (!decodedToken || typeof decodedToken !== 'object' || !('userId' in decodedToken)) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
      const newCart =new Cart({
        UserId:user._id,
        productId
      })
    
      await newCart.save();
    console.log(req.body, "body", token,decodedToken);
    console.log(user,"konenen")

    res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}
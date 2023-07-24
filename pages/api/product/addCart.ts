import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../../../models/User';
import Cart from '../../../models/Cart';
export default async function addCart(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
    const {productId}=req.body;
    const secretKey = process.env.JWT_SECRET!;
    const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies.token;
    if (!token || token.length <=4) {
      return res.status(200).json({ message: 'You are not login' });
    }
    console.log(token,"token");
    const decodedToken = jwt.verify(token, secretKey) as { userId: string };
    if (!decodedToken || typeof decodedToken !== 'object' || !('userId' in decodedToken)) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const cartDetail=await Cart.findOne({UserId:user._id})
    if(cartDetail){
      await Cart.updateOne({UserId:user._id},
        {$push:{productId}})
      }else{
        const newCart =new Cart({
          UserId:user._id,
          productId
        })
      
        await newCart.save();
      }

    res.status(200).json({ message: "Product added to cart" });
    }else if (req.method === 'GET') {
      const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies.token;
    console.log(token,"tokenee");
      if (!token || typeof token !== 'string' || token.length <= 4) {
        return res.status(401).json({ message: 'Invalid or missing token' });
      }
      const secretKey = process.env.JWT_SECRET!;

      try {
        const decodedToken = jwt.verify(token, secretKey) as { userId: string };
        if (!decodedToken || typeof decodedToken !== 'object' || !('userId' in decodedToken)) {
          return res.status(401).json({ message: 'Invalid token' });
        }

        const user = await User.findById(decodedToken.userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        const cartDetail = await Cart.findOne({ UserId: user._id });
        console.log("opoo", cartDetail);
        res.status(200).json({ message: "Product added to cart" });
      } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
   
  } catch (error) {
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}
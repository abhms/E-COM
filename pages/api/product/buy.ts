import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import OrderedProduct from '../../../models/OrderedProduct';
import Cart from '../../../models/Cart';
interface Address {
    mobileNo: string;
    address: string;
    name: string;
    pincode: string;
    city: string;
    state: string;
}

interface AllDataItem {
    _id: string;
}
interface Payment{
    payment:string
}

interface RequestBody {
    allData: AllDataItem[];
    address: Address;
    payment:Payment;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const secretKey = process.env.JWT_SECRET!;

        const { allData, address,payment }: RequestBody = req.body;
        const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Authorization token missing' });
        }
        const decodedToken = jwt.verify(token, secretKey) as { userId: string };

        const user = await User.findById(decodedToken.userId);
        const productIds = allData.map((data) => data._id);
        await Cart.updateMany(
            {
                UserId: user._id,
                productId: { $in: productIds }, 
            },
            {
                $pull: { productId: { $in: productIds } } 
            }
        );
        
        const newOrder = new OrderedProduct({
            UserId: user._id,
            ProductId: productIds,
            Address: address,
            Payment:payment
        });

        await newOrder.save();

        res.status(200).json({ message: 'Your product is on the way' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

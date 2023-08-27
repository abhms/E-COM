import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../../models/User';
import OrderedProduct from '../../../../models/OrderedProduct';
import Product from '../../../../models/Product'; // Import your Product schema

export default async function getUserHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const secretKey = process.env.JWT_SECRET!;

        const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Authorization token missing' });
        }

        const decodedToken = jwt.verify(token, secretKey) as { userId: string };

        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const orders = await OrderedProduct.find({ UserId: user._id });

        console.log(orders, "orders");

        const ordersWithProductDetails = await Promise.all(
            orders.map(async (order) => {
                const productDetails = await Product.find({ _id: { $in: order.ProductId } });
                return {
                    ...order.toObject(),
                    productDetails
                };
            })
        );
            console.log(ordersWithProductDetails,"ordersWithProductDetails");
        res.status(200).json({ ordersWithProductDetails });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

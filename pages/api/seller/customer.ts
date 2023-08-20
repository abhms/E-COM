import { NextApiRequest, NextApiResponse } from 'next';
import Order from '../../../models/OrderedProduct';
import Product from '../../../models/Product';
import User from '../../../models/User';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { _id } = req.body;

        if (!_id) {
            res.status(200).json({ error: "You are not logged in" });
            return;
        }
        const products = await Product.find({ sellerId: _id });
        //@ts-ignore
        const productIds = products.map(product => product._id.toString());
        const matchedOrders = await Order.find({ ProductId: { $in: productIds } });
        const userIdsSet = new Set(matchedOrders.map(order => order.UserId));
        const userIds = Array.from(userIdsSet);

        const usersPromises = userIds.map(async userId => {
            const user = await User.findById(userId);
            return user;
        });
        const users = await Promise.all(usersPromises);

        console.log(users, "users");
        res.status(200).json({ message: "Success",users });
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred' });
    }
}

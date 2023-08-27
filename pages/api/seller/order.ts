import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import Order from '../../../models/OrderedProduct';
import Product from '../../../models/Product';
import User from '../../../models/User';

interface MergedItem {
    _id: ObjectId;
    ProductId: ObjectId;
    productData: {};
    userData: {};
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId } = req.body;
        const products = await Product.find({ sellerId: userId });
        const productIds = products.map(product => product._id);
        const productIdsAsStrings = productIds.map(id => new ObjectId(id).toString());
        const orders = await Order.find({ ProductId: { $in: productIdsAsStrings } });
        const mergedData: MergedItem[] = [];
        for (const order of orders) {
            const matchingProduct = products.find(product =>
                product._id.toString() === order.ProductId.toString()
            );
            if (matchingProduct) {
                const matchingUser = await User.findOne({ _id: order.UserId });
                if (matchingUser) {
                    const { userId, productId, password, ...userData } = matchingUser.toObject();
                    const mergedItem: MergedItem = {
                        ...order.toObject(),
                        productData: matchingProduct.toObject(),
                        userData
                    };
                    mergedData.push(mergedItem);
                }
            }
        }
        res.status(200).json({ message: "You Order", mergedData });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

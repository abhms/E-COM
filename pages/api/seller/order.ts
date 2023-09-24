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
        console.log(productIdsAsStrings,"orders",productIds);
        const mergedData: MergedItem[] = [];
        // for (const order of orders) {
        //     const matchingProduct = products.find(product =>{

        //         // product._id.toString() === orders[i].ProductId.toString().split(',')[i]
        //         for (var i=0;i<orders.length;i++){
        //         //  product._id.toString() === orders[i].ProductId.toString().split(',')[i]

        //              console.log(product._id.toString(),"pppppppppppp", orders[i].ProductId.toString().split(',')[i],"aaaaa")
        //         }
        //         // console.log(product._id.toString(),"product._idproduct._id")
        //     }
        //     );
        //     console.log(matchingProduct,"matchingProduct",orders[0].ProductId.toString());
        //     if (matchingProduct) {
        //         const matchingUser = await User.findOne({ _id: order.UserId });
        //         if (matchingUser) {
        //             const { userId, productId, password, ...userData } = matchingUser.toObject();
        //             const mergedItem: MergedItem = {
        //                 ...order.toObject(),
        //                 productData: matchingProduct.toObject(),
        //                 userData
        //             };
        //             mergedData.push(mergedItem);
        //         }
        //     }
        // }
        // for (const product of products) {
        //     for (const order of orders) {
        //         const productIdsFromOrder = order.ProductId.toString().split(',');
        //         for (const productIdFromOrder of productIdsFromOrder) {
        //             if (product._id.toString() === productIdFromOrder) {
        //               product._id.toString()===productIdFromOrder
        //                 // console.log(product._id.toString(), "pppppppppppp", productIdFromOrder, "aaaaa");
        //             }
        //         }
        //     }
        // }
        for (const product of products) {
            for (const order of orders) {
                const productIdsFromOrder = order.ProductId.toString().split(',');
                for (const productIdFromOrder of productIdsFromOrder) {
                    if (product._id.toString() === productIdFromOrder) {
                        console.log("Matching product:", product._id.toString(), "Order ProductId:", productIdFromOrder);
        
                        const matchingUser = await User.findOne({ _id: order.UserId });
        
                        if (matchingUser) {
                            const { userId, productId, password, ...userData } = matchingUser.toObject();
                            const mergedItem: MergedItem = {
                                ...order.toObject(),
                                productData: product.toObject(),
                                userData
                            };
                            mergedData.push(mergedItem);
                        }
                    }
                }
            }
        }
        res.status(200).json({ message: "You Order", mergedData });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

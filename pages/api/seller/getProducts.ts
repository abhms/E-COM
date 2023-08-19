import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/User';
import Product from '../../../models/Product';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const {_id}=req.body
        const getProduct=await Product.find({sellerId:_id})
        console.log(getProduct,"pooo");
        res.status(200).json({ getProduct });
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred' });
    }
}
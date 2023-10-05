import { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../models/Product';

export default async function getProduct(
    req: NextApiRequest,
    res: NextApiResponse
  ) {


    try {
        const pro=await Product.find({deleted:false});
        console.log(pro,"pro");
        res.status(200).json({ product:pro });
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred' });
    }
  }
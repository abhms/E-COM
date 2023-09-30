import { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../models/Product';

export default async function searchHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //@ts-ignore
    const searchQuery = req.query.search[0]; 
    const regex = new RegExp(`.*${searchQuery}.*`, 'i');
    console.log(regex,"regexxx");
    const searchFields = ['productname'];

    const filter = {
      $or: searchFields.map((field) => ({
        [field]: { $regex: searchQuery, $options: 'i' },
      }))
    };
    console.log(filter.$or[0].productname.$regex,"filterrr");
    const products = await Product.find({
      productname:  {$regex:searchQuery,$options:"i"},
    });
    console.log(products,"rpror");
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}

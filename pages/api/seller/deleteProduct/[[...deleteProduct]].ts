import { NextApiRequest, NextApiResponse } from 'next';
import Product from '../../../../models/Product';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //@ts-ignore
    const productId = req.query.deleteProduct[0];

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { deleted: true },
      { new: true } 
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An internal server error occurred' });
  }
}

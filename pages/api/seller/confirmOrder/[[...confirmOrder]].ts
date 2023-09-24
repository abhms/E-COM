import { NextApiRequest, NextApiResponse } from 'next';
import Purchase from '../../../../models/Purchased';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // Handle GET request here
    try {
        const {confirmOrder}=req.query
        // @ts-ignore
      const PurchaseOrder=await Purchase.find({sellerId:confirmOrder[0]})
      console.log(PurchaseOrder);
      res.status(200).json({ message: 'All reject or accept Order',PurchaseOrder });
    } catch (error) {
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  } else if (req.method === 'POST') {
    try {
      const { confirmOrder } = req.query;
      const { sold } = req.body;
      const newPurchase = new Purchase({
        //@ts-ignore
        product: confirmOrder[0],
        //@ts-ignore
        buyerEmail: confirmOrder[1],
        //@ts-ignore
        sellerId: confirmOrder[2],
        sold,
      });
      await newPurchase.save();
      if (sold) {
        res.status(200).json({ message: 'Order confirm Successfully' });
      } else {
        res.status(200).json({ message: 'Order cancel Successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

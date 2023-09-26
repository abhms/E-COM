import { NextApiRequest, NextApiResponse } from 'next';
import Purchase from '../../../../models/Purchased';


export default async function getUserHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        console.log(req.query,"querutututuu");
        //@ts-ignore
        const {confirmOrder}=req.query
        //@ts-ignore
      const PurchaseOrder=await Purchase.find({buyerEmail:confirmOrder[0]})
        res.status(200).json({ message:"great" ,PurchaseOrder});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });  
    }
}
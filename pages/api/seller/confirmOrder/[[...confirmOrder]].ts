import { NextApiRequest, NextApiResponse } from 'next';
import Purchase from "../../../../models/Purchased"
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { confirmOrder } = req.query
        const { sold } = req.body
        const newPurchanse = new Purchase({
            //@ts-ignore
            product: confirmOrder[0],
            //@ts-ignore
            buyerEmail: confirmOrder[1],
            //@ts-ignore
            sellerId: confirmOrder[2],
            sold
        })
        await newPurchanse.save()
        if(sold){
            res.status(200).json({ message: "Order confirm Successfully" });
        }else{
            res.status(200).json({ message: "Order cancel Successfully" });

        }
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred' });

    }
}
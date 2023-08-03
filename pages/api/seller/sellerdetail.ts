import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import SellerDetail from '../../../models/SellerDetail';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const secretKey = process.env.JWT_SECRET!;
        const { formData } = req.body;
        const {mobileNo,address, image, bussinessName,gstNo,panNo,aadharNo}=formData;
        const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'Authorization token missing' });
        }
        const decodedToken = jwt.verify(token, secretKey) as { userId: string };

        const user = await User.findById(decodedToken.userId);
        console.log(req.body.formData);
        const newSeller = new SellerDetail({
            userId: user._id,
            aadharNo: aadharNo,
            address,
            bussinessName,
            gstNo,
            businessLogo: image,
            mobileNo:mobileNo,
            panNo
        })
        await newSeller.save()
        const sellerUser = await User.findOneAndUpdate({ _id: user?._id }, {
            seller: true
        })

        res.status(200).json({ message: 'Your details saved' });
    } catch (error) {
        res.status(500).json({ error: 'An internal server error occurred' });

    }
}
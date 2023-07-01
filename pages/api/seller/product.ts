import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        console.log(req.body, "bodydydydyy");
    } catch (error) {

    }
}
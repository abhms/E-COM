// import { NextApiRequest, NextApiResponse } from 'next';
// import User from "../../models/User"
// export default async (req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     // Get the form data from the request body
//     const { name, email, password } = req.body;
//     
//     // Perform form validation
//     if (!name || !email || !password) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }
//     const UserModel = await User();
//     const userDoc = new UserModel({
//         name,
//         email,
//         password,

//       });

//       await userDoc.save();
//     // TODO: Perform registration logic
//     // Register the user using the provided name, email, and password
//     // Example: save the user to a database

//     return res.status(200).json({ message: 'Registration successful' });
//   } else {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }
// }

// import { NextApiRequest, NextApiResponse } from 'next';
// import User from '../../models/User';
// import { connect } from '../../models/db';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // Example: Create a new user
//     const { name, email, password } = req.body;
//     console.log(req.body,"ppppp");
//     await connect();
//     const newUser = new User({
//       name,
//       email,
//       password,
//     });

//     await newUser.save();

//     // Return the response
//     res.status(200).json({ message: 'User created successfully' });
//   } catch (error) {
//     // Handle errors
//     console.error('Error:', error);
//     res.status(500).json({ error: 'An internal server error occurred' });
//   }
// }

import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../models/User';
import  db  from '../../models/db';
import mongoose from "mongoose"

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // Example: Create a new user
//     const { name, email, password } = req.body;

//     // Establish database connection
//     await connect();

//     // Create a new user instance
//     const newUser = new User({
//       name,
//       email,
//       password,
//     });

//     // Save the new user to the database
//     await newUser.save();

//     // Return the response
//     res.status(200).json({ message: 'User created successfully' });
//   } catch (error) {
//     // Handle errors
//     console.error('Error:', error);
//     res.status(500).json({ error: 'An internal server error occurred' });
//   }
// }
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Example: Create a new user
        const { name, email, password } = req.body;
        console.log(req.body, "ppppp");
        // Establish database connection
        // const dbConnection = await connect();
        // const client = await clientPromise;
        // console.log(client,"client....");
        // const db = client.db();
        await db();
        // if (mongoose.connection.readyState === 1) {
        //     console.log('Database connected');
        //   } else {
        //     console.log('Database not connected');
        //   }
        // console.log(dbConnection,"connection");
        // Create a new user instance
        // const newUser = new User({
        //     name,
        //     email,
        //     password,
        // });
        // // // // console.log(dbConnection,"dbConnection");

        // // // //   // Save the new user to the database
        // await newUser.save();

        // Return the response
        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
}

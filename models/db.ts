import mongoose from "mongoose"

// // CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const  DATABASE_URL = process.env.MONGODB_URI

// // connection function
// export const connect = async () => {
//   const conn = await mongoose
//     .connect(DATABASE_URL as string)
//     .catch(err => console.log(err))
//   console.log("Mongoose Connection Established")
//   return { conn }
// }

// export const connect = async () => {
//     try {
//       // const conn = await mongoose.connect(DATABASE_URL as string);
//       console.log('Mongoose Connection Established');
//       // return conn;


      
//         //  const enpDB = await mongoose.createConnection(process.env.MONGODB_URI!);
//         // console.log(enpDB,"DBDBDBDB");
//         // return enpDB;
      

      
//     } catch (error) {
//       console.error('Error connecting to MongoDB:', error);
//       throw error;
//     }
//   };
// import { MongoClient } from "mongodb";

// if (!process.env.MONGODB_URI) {
//   throw new Error("Please add your Mongo URI to .env.local");
// }

// const uri: string = process.env.MONGODB_URI;
// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (process.env.NODE_ENV === "development") {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).

//   let globalWithMongoClientPromise = global as typeof globalThis & {
//     _mongoClientPromise: Promise<MongoClient>;
//   };

//   if (!globalWithMongoClientPromise._mongoClientPromise) {
//     client = new MongoClient(uri);
//     globalWithMongoClientPromise._mongoClientPromise = client.connect();
//   }

//   clientPromise = globalWithMongoClientPromise._mongoClientPromise;
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri);
//   clientPromise = client.connect();
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise;


// lib/dbConnect.tsx

import _mongoose, { connect } from "mongoose";

declare global {
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function db() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default db;

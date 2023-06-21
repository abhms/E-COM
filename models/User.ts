import mongoose, { Schema, Document } from 'mongoose';

// Define the User schema
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
}, { timestamps: true });

// Define the User model
interface IUser extends Document {
  name?: string;
  email?: string;
  password?: string;
}

const User = mongoose.model<IUser>('User', userSchema);

export default User;

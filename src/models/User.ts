import { model, Schema, Document } from 'mongoose';

export interface IUser extends Document {
  userName: string;
  password: string;
  email: string;
  createdAt: string;
}

const userSchema = new Schema({
  userName: String,
  password: String,
  email: String,
  createdAt: String,
});
const User = model<IUser>('User', userSchema);

export default User;

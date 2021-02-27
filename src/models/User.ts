import { model, Schema, Document } from 'mongoose';

export interface IUser extends Document {
  userName: string;
  password: string;
  picUrl: string;
  email: string;
  createdAt: string;
}

const userSchema = new Schema({
  userName: String,
  password: String,
  picUrl: {
    type: String,
    default:
      'https://res.cloudinary.com/shivamcloud/image/upload/v1592551612/telltale_images/ycbqlq6veulyjeaq35br.png',
  },
  email: String,
  createdAt: String,
});

const User = model<IUser>('User', userSchema);

export default User;

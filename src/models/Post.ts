import { model, Schema, Document } from 'mongoose';

export interface IPost extends Document {
  description: string;
  picUrl?: string;
  userEmail: string;
  createdAt: string;
  comments: Array<{
    description: string;
    userEmail: string;
    userName: string;
    createdAt: string;
  }>;
  likes: Array<{ userEmail: string; createdAt: string }>;
  user: Schema.Types.ObjectId;
}

const postSchema = new Schema({
  description: String,
  picUrl: String,
  userEmail: String,
  createdAt: String,
  comments: [
    {
      description: String,
      userEmail: String,
      userName: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      createdAt: String,
      userEmail: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Post = model<IPost>('Post', postSchema);
export default Post;

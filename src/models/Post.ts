import { model, Schema, Document } from 'mongoose';

export interface IPost extends Document {
  description: string;
  userName: string;
  createdAt: string;
  comments: Array<{ description: string; userName: string; createdAt: string }>;
  likes: Array<{ userName: string; createdAt: string }>;
  user: Schema.Types.ObjectId;
}

const postSchema = new Schema({
  description: String,
  userName: String,
  createdAt: String,
  comments: [
    {
      description: String,
      userName: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      userName: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Post = model<IPost>('Post', postSchema);
export default Post;

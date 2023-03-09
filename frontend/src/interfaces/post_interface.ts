import IComment from './comment_interface';
import ILike from './like_interface';

interface IPost {
  id: string;
  description: string;
  picUrl?: string;
  userEmail: string;
  createdAt: any;
  comments: IComment[];
  likes: ILike[];
  likeCount: number;
  commentCount: number;
}
export default IPost;

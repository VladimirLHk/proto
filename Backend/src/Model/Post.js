import mongoose, {Schema} from 'mongoose';

const PostSchema = new Schema(
  {
    title: String,
    text: String
  },
  {
    timestamp: true,
  }
);

const Post = mongoose.model('Post', PostSchema);

export default Post;


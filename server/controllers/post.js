import User from "../models/User.js";
import Post from "../models/Post.js";

/* CREATE POST */
export const create = async (req, res) => {
  try {
    const { userId, imagePath, caption, likes, comments, visibility } = req.body;
    const user = await User.findById({ _id: userId });
    const newPost = new Post({
      userId: userId,
      userName: user.userName,
      location: user.location,
      imagePath: imagePath,
      caption: caption,
      likes: likes,
      comments: comments,
      visibility: visibility
    });
    await newPost.save();
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* GET FEED POST */
export const Feed = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* LIKE POST */
export const toggleLike = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const post = await Post.findById({ _id: postId });
    const isLiked = post.likes.includes(userId);
    { isLiked ? post.likes.pull(userId) : post.likes.push(userId) }
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    req.status(400).json({ error: err });
  }
}

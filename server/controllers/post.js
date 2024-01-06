import User from "../models/User.js";
import Post from "../models/Post.js";
/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId,imagePath,caption,likes,comments } = req.body; 
    const user = await User.findById({ _id : userId });
    const newPost = new Post({
      userId: userId,
      userName: user.userName,
      location: user.location,
      imagePath: imagePath,
      caption:caption,
      likes:likes,
      comments:comments

    });
    await newPost.save();
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
import User from "../models/User.js";
import Post from "../models/Post.js";
import File from "../models/File.js"

/* GET FEED POST */
export const Feed = async (req, res) => {
  try {
    const posts = await Post.find();
    const postWithUrl = await Promise.all(posts.map( async(post) => {
      const {userName} = await User.findById(post.userId);
      const { url } = await File.findById(post.imageId);
      return { ...post, url,userName };
    }));
    res.status(200).json(postWithUrl);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const explore = async (req, res) => {
  try {
    const posts = await Post.find();
    const postWithUrl = await Promise.all(posts.map( async(post) => {
      const {userName} = await User.findById(post.userId);
      const { url } = await File.findById(post.imageId);
      return { ...post, url,userName };
    }));
    res.status(200).json(postWithUrl);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const isLiked = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const post = await Post.findById({ _id: postId });  
    const isLiked = post.likes.includes(userId);
    if(!isLiked){
      res.status(200).json({isLiked:false});
    }else{
      res.status(201).json({isLiked:true});
    }    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

/* LIKE POST */
export const toggleLike = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const post = await Post.findById({ _id: postId });
    const isLiked = post.likes.includes(userId);
    
    { isLiked ? post.likes.pull(userId) : post.likes.push(userId) }
    await post.save(); 

    res.status(200).json(post)
  } catch (err) {
    req.status(400).json({ error: err });
  }
}

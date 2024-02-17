import User from "../models/User.js";
import Post from "../models/Post.js";
import File from "../models/File.js"
import Comment from "../models/Comment.js";

/* GET FEED POST */
export const Feed = async (req, res) => {
  try {
    const posts = await Post.find();
    const postWithUrl = await Promise.all(posts.map(async (post) => {
      const { userName } = await User.findById(post.userId);
      const { url } = await File.findById(post.imageId);
      const { picturePath } = await User.findOne({ userName: userName });
      return { ...post, url, userName, picturePath };
    }));
    res.status(200).json(postWithUrl);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const getPost = async (req, res) => {
  try {
    const { postId } = req.params
    const post = await Post.findById({ _id: postId });
    const { userName } = await User.findById(post.userId);
    const { url } = await File.findById(post.imageId);
    const { picturePath } = await User.findOne({ userName: userName });
    res.status(200).json({...post,userName,url,picturePath});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const explore = async (req, res) => {
  try {
    const posts = await Post.find();
    const postWithUrl = await Promise.all(posts.map(async (post) => {
      const { userName } = await User.findById(post.userId);
      const { url } = await File.findById(post.imageId);
      const { picturePath } = await User.findOne({ userName: userName });
      return { ...post, url, userName, picturePath };
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
    if (!isLiked) {
      res.status(200).json({ isLiked: false });
    } else {
      res.status(201).json({ isLiked: true });
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

export const comment = async (req, res) => {
  try {
    const { postId } = req.params;
    const {
      userId,
      comment,
      likes,
      replies
    } = req.body;

    const newComment = new Comment({
      userId,
      comment: comment,
      postId,
      likes,
      replies
    });

    console.log(req.body.comment, req.body.userId)
    await newComment.save()

    const post = await Post.findByIdAndUpdate({ _id: postId }, {
      $push: { comments: newComment._id }
    }, {
      new: true
    });

    // console.log('New Comment', newComment);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const reply = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { userId, comment, likes } = req.body;
    await Comment.findByIdAndUpdate({ _id: commentId }, {
      $push: { replies: [{ comment: comment, repliedBy: userId, likes }] }
    }, {
      new: true
    });
    const updatedPost = await Post.findById({ _id: postId })
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
import express from "express";
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import { AdminFeed, Feed, comment,deletePost,deleteComment, editPost, explore, getComments, getPost, getUserPosts, getpostsadmin, removePost, savePost, toggleCommentLike, toggleLike, getComment } from "../controllers/post.js";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Admin from "../models/Admin.js";

const router = express.Router();

/* ROUTE FOR CREATING A NEW POST */
router.post("/create", upload.single("file"), async (req, res) => {
  try {
    const { userId, caption, fileId } = req.body;
    /* call 'upload' Route */
    /* when upload is complete it will provide file path to 'create' Route */
    /* ------------------- */
    const user = await User.findById({ _id: userId });
    const newPost = new Post({
      userId: user._id,
      userName: user.userName,
      location: user.location,
      imageId: fileId,
      caption: caption,
      likes: [],
      comments: [],
      visibility: true,
    });
    await newPost.save();
    await User.findByIdAndUpdate({ _id: userId },
      { $push: { posts: newPost._id } },
      { new: true }
    );
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});
router.post("/admin/create", upload.single("file"), async (req, res) => {
  try {
    const { userId, caption, fileId } = req.body;
    /* call 'upload' Route */
    /* when upload is complete it will provide file path to 'create' Route */
    /* ------------------- */
    const user = await Admin.findById({ _id: userId });
    const newPost = new Post({
      userId: user._id,
      userName: user.userName,
      location: user.location,
      imageId: fileId,
      caption: caption,
      likes: [],
      comments: [],
      visibility: true,
    });
    await newPost.save();
    await Admin.findByIdAndUpdate({ _id: userId },
      { $push: { posts: newPost._id } },
      { new: true }
    );
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

/* ROUTES TO GET ALL POSTS */ 
router.get("/", Feed);
// router.get("/admin",AdminFeed);
router.get("/admin",getpostsadmin);
// router.get("/:userId", Feed);
router.get("/explore",explore);

router.post("/edit/:postId",editPost);

/* ROUTE FOR SINGLE POST */ 
router.get("/:postId",getPost);
router.get("/:userId/posts",getUserPosts);
router.patch("/:postId/toggleSave",savePost);
router.patch("/:postId/remove",removePost);
router.patch("/:postId/delete",deletePost);

/* ROUTES FOR LIKE/UNLIKE POST */ 
router.patch("/:postId/toggleLike/:userId", toggleLike);

/* ROUTES RELATED TO COMMENT */ 
router.get("/:postId/comment/",getComments);
router.get("/:postId/comments/:commentId",getComment);
router.post("/:postId/comment/new", comment);
router.patch("/:postId/comment/toggleCommentLike", toggleCommentLike);
router.patch("/:postId/comment/delete",deleteComment);

export default router;

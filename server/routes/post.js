import express from "express";
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import { Feed, explore, toggleLike } from "../controllers/post.js";
import User from "../models/User.js";
import Post from "../models/Post.js";

const router = express.Router();

router.get("/", Feed);
router.get("/explore",explore)
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

router.patch("/:postId/toggleLike/:userId", toggleLike);
// router.get("/:postId/isLiked/:userId",isLiked);

export default router;

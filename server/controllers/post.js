import User from "../models/User.js";
import Post from "../models/Post.js";
import File from "../models/File.js"
import Comment from "../models/Comment.js";

/*
USER._ID

curiousk : 65cb9a3572dc8e25e6485ba4
smitk : 65cb9a4f72dc8e25e6485ba6
testUser : 65cc410814dfd545893e5347

*/
// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }
/* GET FEED POST */
export const Feed = async (req, res) => {
  try {
    const posts = await Post.find({ visibility: true });
    // const { userId } = req.params;
    // const postWithUrl = await Promise.all(posts.map(async (post) => {
    //   if (post.type === "private") {
    //     const user = await User.findById(userId);
    //     if (user.following.includes(post.userId)) {
    //       const { userName } = await User.findById(post.userId);
    //       const { url } = await File.findById(post.imageId);
    //       const { picturePath } = await User.findOne({ userName: userName });
    //       return { ...post, url, userName, picturePath };
    //     } else {
    //       return;
    //     }
    //   } else {
    //     const { userName } = await User.findById(post.userId);
    //     const { url } = await File.findById(post.imageId);
    //     const { picturePath } = await User.findOne({ userName: userName });
    //     return { ...post, url, userName, picturePath };
    //   }
    // }));
    // const filteredPost = postWithUrl.filter((post) => post !== undefined);
    // res.status(200).json(filteredPost);

    const postWithUrl = await Promise.all(posts.map(async (post) => {
      const { userName } = await User.findById(post.userId);
      const { url } = await File.findById(post.imageId);
      const { picturePath } = await User.findOne({ userName: userName });
      return { ...post, url, userName, picturePath };
    }));
    // const shufflePosts = shuffleArray(postWithUrl)
    // res.status(200).json(shufflePosts);
    res.status(200).json(postWithUrl);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const AdminFeed = async (req, res) => {
  try {
    const posts = await Post.find();
    // const { userId } = req.params;
    // const postWithUrl = await Promise.all(posts.map(async (post) => {
    //   if (post.type === "private") {
    //     const user = await User.findById(userId);
    //     if (user.following.includes(post.userId)) {
    //       const { userName } = await User.findById(post.userId);
    //       const { url } = await File.findById(post.imageId);
    //       const { picturePath } = await User.findOne({ userName: userName });
    //       return { ...post, url, userName, picturePath };
    //     } else {
    //       return;
    //     }
    //   } else {
    //     const { userName } = await User.findById(post.userId);
    //     const { url } = await File.findById(post.imageId);
    //     const { picturePath } = await User.findOne({ userName: userName });
    //     return { ...post, url, userName, picturePath };
    //   }
    // }));
    // const filteredPost = postWithUrl.filter((post) => post !== undefined);
    // res.status(200).json(filteredPost);
    const postWithUrl = await Promise.all(posts.map(async (post) => {
      const user = await User.findOne({ _id: post.userId });
      const { url } = await File.findById(post.imageId);
      return { ...post, url, user };
    }));
    res.status(200).json(postWithUrl);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const getpostsadmin = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* GET A SINGLE POST */
export const getPost = async (req, res) => {
  try {
    const { postId } = req.params
    const post = await Post.findById({ _id: postId });
    const { userName } = await User.findById(post.userId);
    const { url } = await File.findById(post.imageId);
    const { picturePath } = await User.findOne({ userName: userName });
    res.status(200).json({ ...post, userName, url, picturePath });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* GET USER'S ALL POSTS */
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params
    const posts = await Post.find({ userId: userId, visibility: true });
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
}

/* GET ALL POST FOR EXPLORE PAGE */
export const explore = async (req, res) => {
  try {
    const posts = await Post.find({ visibility: true });
    const postWithUrl = await Promise.all(posts.map(async (post) => {
      const { userName } = await User.findById(post.userId);
      const { url } = await File.findById(post.imageId);
      const { picturePath } = await User.findOne({ userName: userName });
      return { ...post, url, userName, picturePath };
    }));
    // const shufflePosts = shuffleArray(postWithUrl)
    // res.status(200).json(shufflePosts);
    res.status(200).json(postWithUrl);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* CHECK IF POST IS LIKED OR NOT */
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

/* LIKE/UNLIKE POST */
export const toggleLike = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const post = await Post.findById({ _id: postId });
    const isLiked = post.likes.includes(userId);

    { isLiked ? post.likes.pull(userId) : post.likes.push(userId) }
    await post.save();

    res.status(200).json(post)
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

export const savePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const user = await User.findById(userId)
    const post = await Post.findById(postId)
    let isSaved = user.saved.includes(postId)
    console.log(isSaved)
    if (isSaved) {
      post.saved.pull(userId);
      user.saved.pull(postId);
    } else {
      post.saved.push(userId);
      user.saved.push(postId);
    }
    await user.save();
    await post.save();
    res.status(200).json({ updatedPost: post, updatedUser: user });
  } catch (err) {
    console.log("Server Error")
    res.status(400).json({ error: err });
  }
}

/* Edit post */
export const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { fileId, caption } = req.body;
    console.log("fileId : ", fileId)
    console.log("caption : ", caption)
    const post = await Post.findOneAndUpdate({ _id: postId }, {
      caption: caption,
      imageId: fileId
    }, { new: true }) //Return
    await post.save();
    // console.log("updated Post : ", post);
    res.status(200).json(post);
  } catch (err) {
    console.log("Server Error")
    res.status(400).json({ error: err });
  }
}
export const removePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOneAndUpdate({ _id: postId }, {
      visibility: false
    }, { new: true }) //Return
    await post.save();
    console.log("updated Post : ", post);
    const user = await User.findOneAndUpdate({ _id: post.userId }, {
      $pull: {
        posts: post._id,
        saved: post._id
      },
    }, { new: true });
    await user.save();
    const posts = await Post.find({ visibility: true });
    console.log("updated User : ", user);
    res.status(200).json({ updatedPosts: posts, updatedUser: user });
  } catch (err) {
    console.log("Server Error")
    res.status(400).json({ error: err });
  }
}

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne({ _id: postId })
    console.log("Post : ", post);
    const user = await User.findOneAndUpdate({ _id: post.userId }, {
      $pull: {
        posts: post._id,
        saved: post._id
      },
    }, { new: true });

    // remove post if from all users who saved it 
    for (const userId of post.saved) {
      const user = await User.findOneAndUpdate({ _id: userId }, {
        $pull: { saved: postId }
      }, { new: true });
      console.log('Deleted in user : ', user)
    }

    await user.save();
    await Post.findOneAndDelete({ _id: postId })
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    console.log("Server Error")
    res.status(400).json({ error: err });
  }
}


const populateCommentsRecursively = async (comments, depth) => {
  if (depth <= 0) {
    return; // Stop recursion if depth is reached
  }

  // Populate userId for each comment
  await Comment.populate(comments, { path: 'userId' });

  // Populate replies for each comment
  await Comment.populate(comments, { path: 'replies' });

  // Recursively populate replies and userId fields for each reply
  for (const comment of comments) {
    await populateCommentsRecursively(comment.replies, depth - 1);
  }
};

/* GET ALL COMMENTS OF A POST */
export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const depth = 5; // Set depth to 5 or retrieve it from request if it's dynamic

    let comments = await Comment.find({ type: 'comment', postId }).exec();

    // Populate comments, replies, and userId fields recursively
    await populateCommentsRecursively(comments, depth);

    // console.log(comments)
    res.status(200).json(comments)
  } catch (err) {
    res.status(400).json({ error: err });
  }
}


/* COMMENT */
export const comment = async (req, res) => {
  try {
    const { postId } = req.params
    const { userId, comment, commentId } = req.body;

    // Create a new comment object
    let newComment = new Comment({
      type: "comment",
      userId,
      postId,
      comment,
      parentId: null,
      replies: [],
    });

    // If parentId is provided, add the comment as a reply
    if (commentId) {
      const parentComment = await Comment.findById(commentId);
      if (!parentComment) {
        return res.status(404).json({ message: "Parent comment not found" });
      }
      newComment = new Comment({
        type: "reply",
        userId,
        postId,
        comment,
        parentId: commentId,
        replies: [],
      })
      await newComment.save();
      parentComment.replies.push(newComment._id);
      await parentComment.save();
    } else {
      await newComment.save();
      await Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id }
      })
    }
    const updatedPost = await Post.findById(postId);
    res.status(201).json({ updatedPost, newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

/* LIKE/UNLIKE COMMENT */
export const toggleCommentLike = async (req, res) => {
  try {
    const { commentId, userId } = req.body;
    const comment = await Comment.findById(commentId);
    const isLiked = comment.likes.includes(userId);
    { isLiked ? comment.likes.pull(userId) : comment.likes.push(userId) }
    await comment.save();
    // const updatedPost = await Post.findOne({ comments: commentId });
    res.status(200).json(comment)
    // res.status(200).json(updatedPost)
  } catch (err) {
    res.status(400).json("{ error: err }");
  }
}

/* DELETE COMMENT */
export const deleteComment = async (req, res) => {
  try {
    const { postId } = req.params
    const { commentId } = req.body;

    // Check if the comment exists
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // If it's a reply, remove it from parent comment's replies array
    if (comment.type === "reply") {
      const parentComment = await Comment.findById(comment.parentId);
      if (!parentComment) {
        return res.status(404).json({ message: "Parent comment not found" });
      }
      parentComment.replies = parentComment.replies.filter(replyId => replyId.toString() !== commentId);
      await parentComment.save();
    } else {
      // If it's a top-level comment, remove it from the post's comments array
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: commentId }
      });
    }

    // Delete the comment itself
    await Comment.findByIdAndDelete(commentId);
    const updatedPost = await Post.findById(postId);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

export const getComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findOne({_id:commentId});
    // const updatedPost = await Post.findOne({ comments: commentId });
    res.status(200).json(comment)
    // res.status(200).json(updatedPost)
  } catch (err) {
    res.status(400).json("{ error: err }");
  }
}
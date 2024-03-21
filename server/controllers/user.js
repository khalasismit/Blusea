import User from "../models/User.js";
import Post from "../models/Post.js";
import File from "../models/File.js";
import Comment from "../models/Comment.js";

// Get User 
export const getUser = async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await User.findOne({ userName: userName });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Edit User
export const edit = async (req, res) => {
  try {
    const { firstName, lastName, userName, location, bio, picturePath,email } = req.body
    const { id } = req.params;
    const user = await User.findOneAndUpdate({ _id: id }, { firstName: firstName, lastName: lastName, userName: userName, location: location, bio: bio, picturePath: picturePath,email:email }, {
      new: true
    });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  }
  catch (error) {
    res.status(404).json({ error })
  }
}


/* GET USER'S SAVED POST */
export const getUserSavedPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
    const savedPosts = user.saved; // Assuming savedPosts is an array of postIds

    // Retrieve details for each saved post
    const postWithUrl = await Promise.all(savedPosts.map(async (postId) => {
      const post = await Post.findOne({_id:postId,visibility:true});
      const { userName } = await User.findById(post.userId);
      const { url } = await File.findById(post.imageId);
      const { picturePath } = await User.findOne({ userName: userName });
      return { ...post, url, userName, picturePath };
    }));
    res.status(200).json(postWithUrl);
  } catch (err) {
    console.log("Server Error")
    res.status(404).json({ message: err.message });
  }
}

export const getFollowers = async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await User.findOne({ userName: userName });
    const followers = await Promise.all(user.followers.map(async (follower) => {
      const user = await User.findById(follower);
      return user;
    }));
    res.status(200).json(followers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getFollowing = async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await User.findOne({ userName: userName });
    const followings = await Promise.all(user.following.map(async (following) => {
      const user = await User.findById(following);
      return user;
    }));
    res.status(200).json(followings);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const knownUsers = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById({ _id: id }).populate("following followers");
    const uniqueUsers = [...new Set([...user.followers, ...user.following])];
    // console.log(uniqueUsers)
    const Users = await Promise.all(uniqueUsers.map(userId => User.findById(userId)));

    // Wait for all user queries to complete
    // const Users = (usersPromises);
    // console.log(Users)
    res.status(200).json(Users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Get All User
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users)
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Search User
export const searchUser = async (req, res) => {
  try {
    const { search, id } = req.params;
    const SearchText = new RegExp(`^${search}`, 'i')
    const users = await User.find({ _id: { $ne: id }, $or: [{ firstName: SearchText }, { lastName: SearchText }, { userName: SearchText }] }).sort({ firstName: 1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error })
  }
};
export const search = async (req, res) => {
  try {
    const { search } = req.params;
    const SearchText = new RegExp(`^${search}`, 'i')
    const users = await User.find({ $or: [{ firstName: SearchText }, { lastName: SearchText }, { userName: SearchText }] }).sort({ firstName: 1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error })
  }
};

export const suggestions = async (req, res) => {
  try {

    const { userId } = req.params;
    // const user = await User.findOne({ _id: userId });
    // const usersFollowingIds = user.following;

    // // Fetch the followings of each user whom you're following
    // const suggestions = [];
    // for (const userFollowingId of usersFollowingIds) {
    //     const userFollowing = await User.findById(userFollowingId);
    //     const userFollowingFollowings = userFollowing.following;
    //     suggestions.push(...userFollowingFollowings);
    // }

    // // Remove duplicates and the users you're already following
    // const filteredSuggestions = suggestions.filter(id => !user.following.includes(id) && id.toString() !== userId);
    // const uniqueFilteredSuggestions = Array.from(new Set(filteredSuggestions));

    // // Fetch user details of suggestions
    // const suggestedUsers = await User.find({ _id: { $in: uniqueFilteredSuggestions } })
    // return res.status(200).json(suggestedUsers);

    const allUsers = await User.find({});
    // Fetch the current user
    const currentUser = await User.findOne({ _id: userId });
    // Fetch the IDs of the users the current user is following
    const usersFollowingIds = currentUser.following;
    // Remove the current user
    const usersWithoutCurrentUser = allUsers.filter(user => user._id.toString() !== userId);
    // Remove the users the current user is following
    const suggestions = usersWithoutCurrentUser.filter(user => !usersFollowingIds.includes(user._id.toString()))
    //suffle
    suggestions.sort(() => Math.random() - 0.8);
    //select first 6
    const randomSuggestions = suggestions.slice(0, 6);
    return res.status(200).json(randomSuggestions);
  } catch (error) {
    console.error('Error searching users:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const getUserToReply = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId).populate("userId");
    const user = comment.userId;
    return res.status(200).json(user);
  } catch (err) {
    console.error('Error getting user to reply:', err);
    return res.status(500).json({ message: 'Server Error' });
  }
}
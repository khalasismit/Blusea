import User from "../models/User.js";

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
    const { search } = req.params;
    const SearchText = new RegExp(`^${search}`, 'i')
    const user = await User.find({ $or: [{ firstName: SearchText }, { lastName: SearchText }] }).sort({ firstName: 1 });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error })
  }
};

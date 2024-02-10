import User from "../models/User.js";

// Get User 
export const getUser = async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await User.findOne({userName:userName});
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Get All User
export const getUsers = async (req,res) =>{
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
    const user = await User.find({$or:[{ firstName: SearchText },{lastName:SearchText}]}).sort({firstName: 1});
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error })
  }
};

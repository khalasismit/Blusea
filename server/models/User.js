import mongoose from "mongoose";

// id (default)
// name (FirstName + LastName )
// userName ()
// birthdate (To check eligibility)
// profilePic
// bio (max - 50 char)
// email 
// password - Encrypted
// posts (user's posts) 
// likes (user's Liked post)
// followers (Array/Object of UserId)
// following (Array/Object of UserId)
// follow-request (Array of userId)
// loginStatus (Boolean [True if Online / false if Offline ] )
// created_at (default)
// updated_at (default)

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      min: 3,
      max: 50,
    },
    lastName: {
      type: String,
      require: true,
      min: 3,
      max: 50,
    },
    userName: {
      type: String,
      require: true,
      max: 25,
      unique: true
    },
    dob: {
      type: Date,
      require: true,
    },
    location: {
      type: String,
      max: 50,
    },
    bio: {
      type: String,
      max: 60,
    },
    picturePath: {
      type: String,
      default:""
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 5,
    },
    status: {
      type: Boolean,
      default: false
    },
    followers: {
      type: Array,
      default: []
    },
    following: {
      type: Array,
      default: []
    },
    followRequest: {
      type: Array,
      default: [],
    },
    sentRequest: {
      type: Array,
      default: [],
    },
    posts: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;  
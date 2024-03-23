import mongoose from "mongoose";

// following :[1,2,3,4,5]
// followers :[4,8,7,2]
// all unique 
// output : [1,2,3,4,5,7,8]


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

const AdminSchema = new mongoose.Schema(
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
    },
    saved: [{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Post'
    }]
  },
  { timestamps: true }
);
const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;  
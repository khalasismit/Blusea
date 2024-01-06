import mongoose from "mongoose";

// id
// userId
// imagePath
// caption
// location
// tags 
// likes - Array/object
// comments - Array/object
// created_at
// updated_at

const PostSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            require:true
        },
        imagePath:{
            type:String,
        },
        caption:{
            type:String,
            max:60
        },
        likes:{
            type:Array,
            default:[], 
        },
        comments:{
            type:Array,
            default:[]
        }
    },{
        timestamps:true
    }
);

const Post = mongoose.model("Post",PostSchema);
export default Post;
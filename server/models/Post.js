import mongoose from "mongoose";

// id
// userId
// imagePath
// caption
// location
// tags 
// likes - Array/object
// comments - Array/object
// visibility
// created_at
// updated_at

const PostSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            require:true
        },
        imageId:{
            type:String,
            require:true,
        },
        caption:{
            type:String,
            max:60,
        },
        likes:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User", 
            default:[],
        }],
        comments:[{
            text:String,
            postedBy:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            default:[]
        }],
        visibility: {
            type :Boolean,
            default:true
        }
    },{
        timestamps:true
    }
);

const Post = mongoose.model("Post",PostSchema);
export default Post;
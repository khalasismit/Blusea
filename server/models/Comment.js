import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        type:{
            type:String,
            require:true
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            require:true
        },
        parentId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment",
            default:null,
        },
        postId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post",
            require:true
        },
        comment:{
            type:String,
            require:true
        },
        likes:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }],
        replies:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment",
        }]
    },{
        timestamps:true
    }
);

const Comment = mongoose.model("Comment",CommentSchema);
export default Comment
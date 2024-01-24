import mongoose from "mongoose";

// id
// comment ()
// userId ( ref )
// postId ( ref )
// created_at
// updated_at

const CommentSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            require:true
        },
        postId:{
            type:String,
            require:true
        },
        comment:{
            type:String
        },
        likes:{
            type:Array,
            default:[]
        },
        reply:[{
            type:{
                CommentSchema,
                replyTo: mongoose.Schema.Types.ObjectId,
                ref:"user"
            }
        }]
    },{
        timestamps:true
    }
);

const Comment = mongoose.model("Comment",CommentSchema);
export default Comment;
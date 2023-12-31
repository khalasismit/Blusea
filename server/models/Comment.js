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
        }
    },{
        timestamps:true
    }
);

const Comment = mongoose.model("Comment",CommentSchema);
export default Comment;
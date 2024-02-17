import mongoose from "mongoose";
const ReplySchema = new mongoose.Schema({
    comment: {
        type: String,
        require:true
    },
    repliedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    likes: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

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
            type:String,
            require:true
        },
        likes:{
            type:Array,
            default:[]
        },
        replies:{
            type:Array,
            default:[]
        }
    },{
        timestamps:true
    }
);

const Comment = mongoose.model("Comment",CommentSchema);
export default Comment
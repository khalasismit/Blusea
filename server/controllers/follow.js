import User from "../models/User.js";

// Important note :- update Code and get userId from req.user._id (loggedIn user). Currently Using req.params

export const follow = async (req, res) => {
    try {
        const { userId,followId } = req.params;
        // 2ndOption 
        // get userId from logged in user req.user._id
        await User.findByIdAndUpdate({ _id: followId }, {
            $push: { followRequest: userId }
        },{
            new:true
        });
        res.status(200).json("Follow-Request-Sent");
    } catch (err) {
        res.status(400).json({ error: err })
    }
}
export const accept = async (req, res) => {
    try {
        const { userId,followId } = req.params;
        await User.findByIdAndUpdate({ _id:userId }, {
            $pull:{ followRequest:followId },
            $push:{ followers: followId }
        },{
            new:true
        });
        await User.findByIdAndUpdate({ _id:followId }, {
            $push:{ following: userId }
        },{
            new:true
        });
        res.status(200).json({msg:`Follow-Request-Accepted. ${followId} started following ${userId} `});
    } catch (err) {
        res.status(400).json({ error: err })
    }
}
export const reject = async (req, res) => {
    try {
        const { userId,followId } = req.params;
        await User.findByIdAndUpdate({ _id:userId }, {
            $pull:{ followRequest:followId }
        },{
            new:true
        });
        res.status(200).json("Follow-Request-Rejected");
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

export const cancel = async (req,res) => {
    try {
        const { userId,followId } = req.params;
        await User.findByIdAndUpdate({ _id:followId }, {
            $pull:{ followRequest:userId }
        },{
            new:true
        });
        res.status(200).json("Follow-Request-Cancelled");
    } catch (err) {
        res.status(400).json({error:err})
    }
}

export const unfollow = async ( req,res ) => {
    try {
        const { userId,followId }=req.params;
        await User.findByIdAndUpdate({_id:userId},{
            $pull:{following:followId}
        },{
            new:true
        });
        await User.findByIdAndUpdate({_id:followId},{
            $pull:{followers:userId}
        },{
            new:true
        });
        res.status(200).json({msg:`${userId} started unfollowing ${followId} `})
        
    } catch (err) {
        res.status(400).json({error:err})
    }
}
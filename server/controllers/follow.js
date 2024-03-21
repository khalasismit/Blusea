import User from "../models/User.js";
// import {io} from "../index.js";
export const requests = async (req,res)=>{
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const data = await Promise.all(user.followRequest.map(async(reqId) => {
            const user = await User.findById(reqId);
            return user;
        }));
        // console.log(data)
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

// Important note :- update Code and get userId from req.user._id (loggedIn user). Currently Using req.params
export const follow = async (req, res) => {
    try {
        const { userId,followId } = req.params;
        let user1 = userId; //mine
        let user2 = followId; //other
        // 2nd Option 
        // get userId from logged in user req.user._id
        const updatedUser = await User.findByIdAndUpdate({ _id: user1 }, {
            $push: { sentRequest: user2 }
        },{
            new:true
        });
        const user1userName = updatedUser.userName
        const updatedUser2 = await User.findByIdAndUpdate({ _id: user2 }, {
            $push: { followRequest: user1 }
        },{
            new:true
        });
        const user2userName = updatedUser2.userName
        
        // io.emit('Request', { userId, followId });
        console.log(`${user1userName} sent Request to ${user2userName}`);

        // res.status(200).json({massage:"Follow-Request-Sent"},updatedUser);
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err })
    }
}
export const accept = async (req, res) => {
    try {
        const { userId,followId } = req.params;
        
        let user1 = userId; //other
        let user2 = followId; //mine

        const updatedUser = await User.findByIdAndUpdate({ _id : user2 }, {
            $pull:{ sentRequest : user1 },
            $push:{ following : user1 }
        },{
            new:true
        });
        const user1userName = updatedUser.userName
        
        const updatedUser2 = await User.findByIdAndUpdate({ _id : user1 }, {
            $pull:{ followRequest:user2 },
            $push:{ followers: user2 }
        },{
            new:true
        });
        const user2userName = updatedUser2.userName
        
        // io.emit('Accept', { userId, followId });

        console.log(`${user1userName} started following ${user2userName}`);
        
        res.status(200).json(updatedUser2);
    } catch (err) {
        res.status(400).json({ error: err })
    }
}
export const reject = async (req, res) => {
    try {
        const { userId,followId } = req.params;
        let user1 = userId;//other
        let user2 = followId;//mine
        const updatedUser = await User.findByIdAndUpdate({ _id:user1 }, {
            $pull:{ followRequest:user2 }
        },{
            new:true
        });
        const user1userName = updatedUser.userName
        const updatedUser2 = await User.findByIdAndUpdate({ _id:user2 }, {
            $pull:{ sentRequest:user1 }
        },{
            new:true
        });

        const user2userName = updatedUser2.userName
        // io.emit('Reject', { userId, followId });
        console.log(`${user1userName} Reject the Request of ${user2userName}`);

        // res.status(200).json("Follow-Request-Rejected");
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err })
    }
}

export const cancel = async (req,res) => {
    try {
        const { userId,followId } = req.params;
        let user1 = userId;
        let user2 = followId;
        const updatedUser = await User.findByIdAndUpdate({ _id:user1 }, {
            $pull:{ sentRequest:user2 }
        },{
            new:true
        });
        const user1userName = updatedUser.userName
        const updatedUser2 = await User.findByIdAndUpdate({ _id:user2 }, {
            $pull:{ followRequest:user1 }
        },{
            new:true
        });
        const user2userName = updatedUser2.userName
        // io.emit('Cancel', { userId, followId });
        console.log(`${user1userName} cancel Request to ${user2userName}`);

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({error:err})
    }
}

export const unfollow = async ( req,res ) => {
    try {
        const { userId,followId }=req.params;
        let user1 = userId;
        let user2 = followId;
        const updatedUser = await User.findByIdAndUpdate({_id:user1},{
            $pull:{following:user2}
        },{
            new:true
        });
        const user1userName = updatedUser.userName
        
        const updatedUser2 = await User.findByIdAndUpdate({_id:user2},{
            $pull:{followers:user1}
        },{
            new:true
        });
        const user2userName = updatedUser2.userName
        console.log(`${user1userName} started unfollowing ${user2userName}`);

        // io.emit('Unfollow', { userId, followId });
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(400).json({error:err})
    }
}
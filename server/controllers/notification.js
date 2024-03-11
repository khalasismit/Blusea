import File from "../models/File.js";
import Notification from "../models/Notification.js";

export const newNotif = async (req, res) => {
    try {
        const { senderId, receiverId, message, postId } = req.body
        // console.log(senderId, receiverId, message, postId)
        const newNotif = new Notification({
            senderId: senderId,
            receiverId: receiverId,
            message: message,
            postId: postId
        })
        await newNotif.save();
        const notif = await Notification.findOne({ senderId: senderId, receiverId: receiverId, postId: postId, message: message }).populate("senderId", "userName picturePath").populate("postId", "imageId");
        const {url} = await File.findOne({ _id: notif.postId.imageId });
        return res.status(201).json({...notif,url});
    } catch (err) {
        console.log("server error")
        return res.status(400).json({ message: "Server Error" });
    }
}

export const getNotif = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifs = await Notification.find({ receiverId: userId }).populate({
            path: "senderId",
            select: "userName picturePath"
        }).populate({
            path: "postId",
            select: "imageId"
        });
        const notifications = await Promise.all(notifs.map(async (notif) => {
            const { url } = await File.findOne({ _id: notif.postId.imageId });
            return { ...notif, url };
        }));
        return res.status(201).json(notifications);
    } catch (err) {
        console.log("server error")
        return res.status(400).json({ message: "Server Error" });
    }
}
export const delNotif = async (req, res) => {
    try {
        const { senderId, receiverId, postId,message } = req.body
        const deletedNotif = await Notification.findOneAndDelete({ senderId: senderId, receiverId: receiverId, postId: postId,message:message });
        return res.status(201).json(deletedNotif);
    } catch (err) {
        console.log("server error")
        return res.status(400).json({ message: "Server Error" });
    }
}
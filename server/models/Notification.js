import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    message: {
        type: String,
        require: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    status: {
        type: String,
        enum: ['unread', 'read'],
        default: 'unread'
    },
}, {
    timestamps: true
});

const Notification = mongoose.model('notification', NotificationSchema);
export default Notification;
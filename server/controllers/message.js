import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import crypto from 'crypto-js';
import dotenv from 'dotenv'
dotenv.config();
/*
USERID FOR TESTING

CURIOUSK : 65cb9a3572dc8e25e6485ba4
SMITK : 65cb9a4f72dc8e25e6485ba6
TESTUSER1 : 65cc410814dfd545893e5347

*/

// Function to encrypt a message using AES
const encryptMessage = (message) => {
    const cipherText = crypto.AES.encrypt(message, process.env.SECRET_KEY).toString()
    return cipherText;
}

// const message = encryptMessage("hello","sbjcbsjdbh");
// console.log(message)

// Function to decrypt a message using AES
const decryptMessage = (encryptMessage) => {
    const bytes = crypto.AES.decrypt(encryptMessage, process.env.SECRET_KEY);
    if (bytes.sigBytes > 0) {
        const decryptedMessage = bytes.toString(crypto.enc.Utf8)
        return decryptedMessage
    }
    return
}

export const decryptMessageAsync = async (req, res) => {
    try {
        const { message } = req.body;
        const bytes = crypto.AES.decrypt(message, process.env.SECRET_KEY);
        if (bytes.sigBytes > 0) {
            const decryptedMessage = bytes.toString(crypto.enc.Utf8);
            return res.status(200).json(decryptedMessage);
        }
        return res.status(400).json({ message: "Invalid message" });
    } catch (err) {
        console.log("server error")
        return res.status(400).json({ message: "Server Error" });
    }
}

/* CREATE CONVERSATION */
export const createConversation = async (req, res) => {
    try {
        // console.log(userId);
        let { userId, otherUserId } = req.body;
        console.log(userId, otherUserId)
        let existingConversation = await Conversation.findOne({
            participants: { $all: [userId, otherUserId] }
        });
        if (existingConversation) {
            // If conversation already exists, return the existing conversation
            const conversation = await existingConversation.populate("participants messages")
            const decryptedMessagesConversation = await Promise.all(conversation.messages.map((message) => {
                const decryptedMessage = decryptMessage(message.message)
                return { ...message.toObject(), message: decryptedMessage }
            }))
            return res.status(200).json(decryptedMessagesConversation);
        }
        /* Create new conversation and save it */
        const newConversation = await Conversation.create({ participants: [userId, otherUserId] })
        const conversation = await newConversation.populate("participants")
        return res.status(201).json(conversation);
    } catch (err) {
        console.log("server error")
        return res.status(400).json({ message: "Server Error" });
    }
}

// 2024-03-01T14:22:37.446+00:00
/* GET CONVERSATIONS */
export const getConversations = async (req, res) => {
    try {
        const { id } = req.params;
        let conversations = await Conversation.find({ participants: id }).sort({ updatedAt: -1 }).populate("participants messages");
        conversations = await Promise.all(conversations.map(async (conversation) => {
            const decryptedMessages = await Promise.all(conversation.messages.map(async (message) => {
                const decryptedMessage = decryptMessage(message.message);
                return {
                    ...message._doc,
                    message: decryptedMessage
                };
            }));

            return {
                ...conversation._doc,
                messages: decryptedMessages
            };
        }));
        return res.status(200).json(conversations);
    } catch (err) {
        console.log("server error")
        res.status(400).json({ error: err });
    }
}

export const getConversation = async (req, res) => {
    try {
        const { id } = req.params;
        let conversation = await Conversation.findOne({ _id: id }).populate("participants messages");
        const decryptedMessages = await Promise.all(conversation.messages.map(async (message) => {
            const decryptedMessage = await decryptMessage(message.message);
            return {
                ...message._doc,
                message: decryptedMessage
            };
        }));
        // Replace the messages array in the conversation object with the decrypted messages
        conversation.messages = decryptedMessages;

        return res.status(200).json(conversation);
    } catch (err) {
        console.log("server error")
        res.status(400).json({ error: err });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { message, senderId, receiverId } = req.body;
        const conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } });
        const encryptedMessage = encryptMessage(message);
        // if found then add else create one
        if (conversation) {
            const newMessage = new Message({
                conversationId: conversation._id,
                receiverId: receiverId,
                senderId: senderId,
                message: encryptedMessage
            });
            await newMessage.save();
            conversation.messages.push(newMessage._id);
            await conversation.save();
            const NewMessage = await Message.findOne({ _id: newMessage._id }).populate("senderId receiverId")
            res.status(200).json({ NewMessage });
        } else {
            const newConversation = new Conversation({
                participants: [senderId, receiverId],
                messages: []
            });
            await newConversation.save();
            const newMessage = new Message({
                conversationId: newConversation._id,
                senderId: senderId,
                receiverId: receiverId,
                message: encryptedMessage
            });
            await newMessage.save();
            newConversation.messages.push(newMessage._id);
            await newConversation.save();
            const NewMessage = await Message.findOne({ _id: newMessage._id }).populate("senderId receiverId").exec();
            res.status(200).json({ NewMessage });
        }
    } catch (err) {
        console.log("server error")
        res.status(400).json({ error: err });
    }
}


/* GET MESSAGES FOR A CONVERSATION */
export const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;

        const messages = await Message.find({ conversationId }).populate("senderId receiverId");

        const decryptedMessages = await Promise.all(messages.map(message => {
            const Decryptedmessage = decryptMessage(message.message)
            return { ...message._doc, message: Decryptedmessage }
        }));
        res.status(200).json(decryptedMessages);
    } catch (err) {
        console.log("server error")
        res.status(400).json({ error: err });
    }
}


/* GET CONVERSATIONS */
// export const getConversations = async (req, res) => {
//     try {
//         const {userId} = req.body;
//         const conversations = await Conversation.find({ participants: userId });
//         if (!conversations || !conversations.length) return res.status(404).json("No conversations found");
//         res.status(200).json(conversations);
//     } catch (err) {
//         console.log("server error")
//         res.status(400).json({ error: err });
//     }
// }
// import Conversation from "../models/Conversation";
// import Message from "../models/Message";

export const sendMessage = async (req, res) => {
    console.log("message sent");
}
    // try {
        // const { senderId, receiverId } = req.params;
        // const { text } = req.body;
        // const conversation = await Conversation.findOne({ participants: [senderId, receiverId] });
        // if (conversation) {
        //     const message = new Message({
        //         conversationId: conversation._id,
        //         sender: senderId,
        //         text
        //     });
        //     await message.save();
        //     conversation.messages.push(message._id);
        //     await conversation.save();
        //     res.status(200).json({ message });
        // } else {
        //     const newConversation = new Conversation({
        //         participants: [senderId, receiverId],
        //         messages: []
        //     });
        //     await newConversation.save();
        //     const message = new Message({
        //         conversationId: newConversation._id,
        //         sender: senderId,
        //         text
        //     });
        //     await message.save();
        //     newConversation.messages.push(message._id);
        //     await newConversation.save();
        //     res.status(200).json({ message });
        // }
        // console.log("message sent");
    // } catch (err) {
    //     res.status(400).json({ error: err });
    // }
// }
// export const getMessagesInConversation = async (req, res) => {}

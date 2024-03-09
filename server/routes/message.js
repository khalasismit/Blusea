import express from "express";
import { createConversation, decryptMessageAsync, getConversation, getConversations, getMessages, sendMessage } from "../controllers/message.js"

const router = express.Router();

router.post('/conversation/create',createConversation);
router.get('/:id',getConversation);
router.get('/:id/conversations',getConversations);
router.get('/:conversationId/messages',getMessages);
router.post("/message/decrypt",decryptMessageAsync);
router.post('/message/new',sendMessage);

export default router;
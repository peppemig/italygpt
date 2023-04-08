import express from "express"
import { createConversation, getAllConversations, deleteConversation, getConversation, deleteMessagesInConversation } from "../controllers/conversation.js"

const router = express.Router()

//POST
router.post("/", createConversation)
router.get("/", getAllConversations)
router.get("/:id", getConversation)
router.delete("/:id", deleteConversation)
router.put("/messages/:id", deleteMessagesInConversation)

export default router
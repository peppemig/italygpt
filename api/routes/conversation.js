import express from "express"
import { createConversation, getAllConversations, deleteConversation } from "../controllers/conversation.js"

const router = express.Router()

//POST
router.post("/", createConversation)
router.get("/", getAllConversations)
router.delete("/:id", deleteConversation)

export default router
import express from "express"
import { deleteAllMessages, getAllMessages } from "../controllers/message.js"

const router = express.Router()

//GET
router.get("/", getAllMessages)
router.delete("/", deleteAllMessages)

export default router
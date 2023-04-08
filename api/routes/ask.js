import express from "express"
import { askQuestion } from "../controllers/ask.js"

const router = express.Router()

//POST
router.put("/:id", askQuestion)

export default router
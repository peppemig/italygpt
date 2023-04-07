import express from "express"
import { askQuestion } from "../controllers/ask.js"

const router = express.Router()

//POST
router.post("/", askQuestion)

export default router
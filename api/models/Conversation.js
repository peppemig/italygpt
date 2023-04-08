import mongoose from "mongoose"

const conversationSchema = new mongoose.Schema({
    name: String,
    messages: []
})

export default mongoose.model("Conversation", conversationSchema)
import mongoose from "mongoose"

const conversationSchema = new mongoose.Schema({
    messages: {type: mongoose.Schema.Types.ObjectId, ref:'Message'}
})

export default mongoose.model("Conversation", conversationSchema)
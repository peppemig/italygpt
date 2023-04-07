import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    createdAt: String,
    type: String,
    text: String,
    conversation: {type: mongoose.Schema.Types.ObjectId, ref:'Conversation'}
})

export default mongoose.model("Message", messageSchema)
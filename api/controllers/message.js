import Message from "../models/Message.js";

export const getAllMessages = async (req,res) => {

    try {
        const messages = await Message.find({})
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json(error)
    }
    
}

export const deleteAllMessages = async (req,res) => {

    try {
        await Message.deleteMany({})
        res.status(200).json('Messages deleted')
    } catch (error) {
        res.status(404).json(error)
    }
}
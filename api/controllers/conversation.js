import Conversation from "../models/Conversation.js";

export const createConversation = async (req,res) => {
    try {
        const convName = req.body.name

        const newConv = new Conversation({
            name: convName,
            messages: []
        })

        await newConv.save()

        res.status(201).json('Conversation created')
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getAllConversations = async (req,res) => {
    try {
        const conversations = await Conversation.find({})
        res.status(200).json(conversations)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const deleteConversation = async (req,res) => {
    try {
        const {id} = req.params
        const deleted = await Conversation.findByIdAndDelete(id)
        res.status(200).json('Deleted')
    } catch (error) {
        res.status(400).json(error)
    }
}
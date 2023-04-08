import Conversation from "../models/Conversation.js";
import { format } from "date-fns"

// GENERATE DATE 'hh:mm dd/MM/yyyy'
export const genDate = () => {
    const date = new Date
    const formattedDate = format(date, 'hh:mm dd/MM/yyyy')
    return formattedDate
}

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

export const getConversation = async (req,res) => {
    try {
        const {id} = req.params
        const conversation = await Conversation.findById(id)
        res.status(200).json(conversation)
    } catch (error) {
        res.status(404).json(error)
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

export const deleteMessagesInConversation = async (req,res) => {
    try {
        const {id} = req.params
        const deletedMessages = await Conversation.findByIdAndUpdate(id, { $set: { messages: [] }})
        res.status(200).json('Deleted messages')
    } catch (error) {
        res.status(400).json(error)
    }
}
import { Configuration, OpenAIApi } from "openai"
import Message from "../models/Message.js"

export const askQuestion = async (req, res) => {
    
    try {
        const text = req.body.data
        const apikey = req.body.apikey

        const newQuestion = new Message({
            createdAt: Date.now(),
            type: 'human',
            text: text
        })
        await newQuestion.save()
    
        const conf = new Configuration({
            apiKey: apikey
        })
        const openai = new OpenAIApi(conf)
    
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            max_tokens: 500
        })
    
        const response = completion.data.choices[0].text
        
        const newAnswer = new Message({
            createdAt: Date.now(),
            type: 'bot',
            text: response
        })
        await newAnswer.save()
        
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }

}
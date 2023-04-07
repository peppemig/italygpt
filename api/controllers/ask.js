import { Configuration, OpenAIApi } from "openai"
import Message from "../models/Message.js"
import { format } from "date-fns"

// GENERATE DATE 'hh:mm dd/MM/yyyy'
export const genDate = () => {
    const date = new Date
    const formattedDate = format(date, 'hh:mm dd/MM/yyyy')
    return formattedDate
}

export const askQuestion = async (req, res) => {
    
    try {
        const text = req.body.data
        const apikey = req.body.apikey

        const newQuestion = new Message({
            createdAt: genDate().toString(),
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
            createdAt: genDate().toString(),
            type: 'bot',
            text: response
        })
        await newAnswer.save()
        
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }

}
import { format } from "date-fns"
import axios from "axios"

// GENERATE DATE 'hh:mm dd/MM/yyyy'
export const genDate = () => {
    const date = new Date
    const formattedDate = format(date, 'hh:mm dd/MM/yyyy')
    return formattedDate
}

// ASK QUESTION TO API
export const askQuestion = async (question, apikey) => {
  try {
    const response = await axios.post('http://localhost:5000/api/ask', {data: question, apikey: apikey})
    return response.data
  } catch (error) {
    return error.message
  }
}
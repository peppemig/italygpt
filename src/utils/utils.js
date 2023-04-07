import { format } from "date-fns"
import axios from "axios"
import { toast } from 'react-hot-toast'

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

// DELETE ALL MESSAGES
export const deleteAllMessages = async () => {
  try {
    const response = await axios.delete('http://localhost:5000/api/message').then(toast.success('Cronologia messaggi eliminata'))
    
    setTimeout(() => {
      window.location.reload(false);
    }, "1500")

    return response
  } catch (error) {
    return error
  }
}

// CREATE NEW CONVERSATION
export const createNewConversation = async (name) => {
  try {
    const response = await axios.post("http://localhost:5000/api/conversation", {name: name}).then(toast.success('Conversazione creata correttamente'))

    setTimeout(() => {
      window.location.reload(false);
    }, "1500")

    return response

  } catch (error) {
    return error.message
  }
}
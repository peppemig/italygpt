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
export const askQuestion = async (convid, question, apikey) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/ask/${convid}`, {data: question, apikey: apikey})
    return response.data
  } catch (error) {
    return error.message
  }
}

// DELETE ALL MESSAGES
export const deleteAllMessages = async (convid) => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/conversation/messages/${convid}`).then(toast.success('Cronologia messaggi eliminata'))
    
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
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/conversation`, {name: name}).then(toast.success('Conversazione creata correttamente'))

    setTimeout(() => {
      window.location.reload(false);
    }, "1500")

    return response

  } catch (error) {
    return error.message
  }
}
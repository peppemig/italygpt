import { BsChatDots } from "react-icons/bs"
import axios from "axios"
import { toast } from 'react-hot-toast'
import { useDispatch } from "react-redux"
import { addConversationId } from "../redux/actions/conversationidActions"

const ChatItem = ({id, label}) => {
  const dispatch = useDispatch()
  const conversationid = localStorage.getItem('conversationid')

  const deleteConversation = async (convId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/conversation/${convId}`).then(toast.success('Chat eliminata correttamente'))

      setTimeout(() => {
        window.location.reload(false);
      }, "1500")

      return response
    } catch (error) {
      return error
    }
  }

  const setConversationId = (convid) => {
    dispatch(addConversationId(convid))
    window.location.reload(false);
  }

  return (
    <div className="flex flex-col m-4 gap-1">
      <div onClick={() => setConversationId(id)} 
        className={conversationid === id ? 'fadeanimation bg-neutral-700 flex items-center gap-2 rounded-md p-5 text-white border-[1px] cursor-pointer hover:bg-neutral-500 transition' : 'fadeanimation flex items-center gap-2 rounded-md p-5 text-white border-[1px] cursor-pointer hover:bg-neutral-500 transition'}>
        <BsChatDots size={20}/>
        {label}
      </div>
      <div onClick={() => deleteConversation(id)} className="mt-1 text-xs text-white font-semibold flex w-[60px] h-[20px] bg-red-500 items-center justify-center rounded-md hover:bg-red-700 transition cursor-pointer">
        Elimina
      </div>
    </div>
    
  )
}

export default ChatItem
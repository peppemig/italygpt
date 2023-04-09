import { BsChatDots } from "react-icons/bs"
import axios from "axios"
import { toast } from 'react-hot-toast'
import { useDispatch } from "react-redux"
import { addConversationId } from "../redux/actions/conversationidActions"

const NavbarChatItem = ({id, label}) => {
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

    <div className="flex items-center justify-center bg-[#2E343D] cursor-pointer">
      <div onClick={() => setConversationId(id)} className={conversationid === id ? "flex p-3 text-white w-[80%] hover:bg-neutral-800 transition items-center gap-2 bg-neutral-900" : "flex p-3 text-white w-[80%] hover:bg-neutral-800 transition items-center gap-2"}>
        <BsChatDots size={20}/>
        {label}
      </div>
      <div onClick={() => deleteConversation(id)} className="font-bold text-white flex p-3 w-[20%] bg-red-500 hover:bg-red-900 items-center justify-center transition">
        X
      </div>
    </div>

  )
}

export default NavbarChatItem
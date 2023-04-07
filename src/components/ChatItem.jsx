import { BsChatDots } from "react-icons/bs"
import { AiFillDelete, AiOutlineCloseCircle } from 'react-icons/ai'
import axios from "axios"
import { toast } from 'react-hot-toast'
import { useState } from "react"

const ChatItem = ({id, label}) => {
  const [openModal, setOpenModal] = useState(false)


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

  return (
    


    <div className='relative fadeanimation flex items-center gap-2 rounded-md m-4 p-5 text-white border-[1px] cursor-pointer hover:bg-neutral-500 transition'>
        <AiFillDelete onClick={() => setOpenModal(!openModal)} className={openModal ? "hidden" : "absolute top-2 right-2"}/>

          {openModal ? 
            (
              <>
                <div className="flex py-1 items-center justify-center w-[50%] px-2 rounded-md bg-green-500 hover:bg-green-300 transition" onClick={() => deleteConversation(id)}>Si</div>
                <div className="flex py-1 items-center justify-center w-[50%] px-1 rounded-md bg-red-500 hover:bg-red-300 transition" onClick={() => setOpenModal(!openModal)}>No</div>
              </>
            )
            : 
            (
              <div className="truncate">
                {label}
              </div>
            )
          }

    </div>
    
  )
}

export default ChatItem
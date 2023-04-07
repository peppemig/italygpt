import { useEffect, useState } from 'react'
import { BsSend } from "react-icons/bs"
import { AiFillDelete } from 'react-icons/ai'
import BotMessage from './BotMessage'
import HumanMessage from './HumanMessage'
import ChatItem from './ChatItem'
import axios from 'axios'
import LoadingMessage from './LoadingMessage'
import { toast } from 'react-hot-toast'
import { genDate, askQuestion, deleteAllMessages } from "../utils/utils.js"

 
const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const apikey = localStorage.getItem('apikey')

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      pushMessageToArr(currentMessage)
    }
  };

  const getMessages = async () => {
    try {
      const messages = await axios.get('http://localhost:5000/api/message')
      console.log(messages)
      setChatMessages(messages.data)
      return messages
    } catch (error) {
      return error.message
    }
  }

  const pushMessageToArr = async (text) => {
    if(apikey === ''){
      toast.error('Devi impostare una API key prima di poter chattare')
      return
    }

    setLoading(true)
    setCurrentMessage('')

    const newMessage = {
      createdAt: genDate(),
      type: 'human',
      text: text
    }

    setChatMessages([...chatMessages, newMessage])
    const response = await askQuestion(text, apikey)

    const newAnswer = {
      createdAt: genDate(),
      type: 'bot',
      text: response
    }

    setLoading(false)
    setChatMessages([...chatMessages, newMessage, newAnswer])
  }


  // ALWAYS SCROLL TO LAST MESSAGE
  const handleScroll = () => {
      const element = document.getElementById(chatMessages.length - 1);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    handleScroll()
  }, [chatMessages])

  useEffect(() => {
    getMessages()
  }, [])

  return (

    <div className='flex flex-row h-[100%] overflow-x-hidden relative fadeanimation'>

        {openDeleteModal &&
        <div className='absolute z-10 flex w-full h-full bg-black bg-opacity-40 justify-center items-center fadeanimation'>
          <div className='flex items-center justify-center bg-gray-200 rounded-md h-[400px] w-[400px] flex-col'>
            
            <AiFillDelete size={40} className='mt-4'/>

            <div className='flex p-4 w-full text-center text-lg font-bold'>Sei sicuro di voler cancellare la tua cronologia messaggi?</div>

            <div className='flex items-center justify-center gap-3'>
              <div onClick={() => deleteAllMessages()} className='bg-green-500 cursor-pointer text-white rounded-md w-[100px] h-[40px] flex font-bold text-lg items-center justify-center hover:bg-green-700 transition'>Si</div>
              <div onClick={() => setOpenDeleteModal(false)} className='bg-red-500 cursor-pointer text-white rounded-md w-[100px] h-[40px] flex font-bold text-lg items-center justify-center hover:bg-red-700 transition'>No</div>
            </div>

          </div>
          
        </div>
        }

        {/* LEFT SIDE */}
        <div className='overflow-y-auto hidden items-center justify-center md:block md:w-[25%] lg:w-[15%] h-[100%] bg-[#1a1a1a]'>
          <ChatItem label="Chat 1"/>
        </div>


        {/* RIGHT SIDE */}
        <div className='relative h-[100%] w-[100%] md:w-[75%] lg:w-[85%] bg-[#202329] flex flex-col'>

          {/* CHAT MESSAGES CONTAINER */}
          <div className='flex flex-col max-h-[85%] overflow-y-auto overflow-x-hidden'>

            {chatMessages.length > 0 &&
              chatMessages.map((message, index) => {
                if(message.type === 'bot') {
                  return (
                    <BotMessage createdAt={message.createdAt} id={index} key={index} message={message.text} />
                  )
                } else {
                  return (
                    <HumanMessage createdAt={message.createdAt} id={index} key={index} message={message.text} />
                  )
                }
              })
            }

            {loading && (
              <LoadingMessage/>
            )}

          </div>


          {/* TEXT BOX CONTAINER */}
          <div className='absolute flex items-center justify-center bottom-0 bg-[#2E333F] w-full h-[15%]'>
            <div className='p-5 w-[95%] h-[80%] md:h-[80%] md:w-[90%] lg:w-[60%] bg-transparent flex items-center justify-center rounded-lg border-[1.5px] border-gray-500 overflow-hidden'>
              <input onKeyDown={handleKeyDown} disabled={loading} value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} className='bg-transparent w-full h-full p-5 focus:outline-none text-white' placeholder='Cerca qualcosa...'/>

              <div className='flex flex-col gap-2'>
                <div onClick={() => pushMessageToArr(currentMessage)} className='h-10 w-10 bg-[#202329] items-center rounded-md justify-center flex hover:bg-[#3d434e] transition cursor-pointer'>
                  <BsSend size={24} color='white' />
                </div>
                <div onClick={() => setOpenDeleteModal(!openDeleteModal)} className='h-10 w-10 bg-[#202329] items-center rounded-md justify-center flex hover:bg-[#3d434e] transition cursor-pointer'>
                  <AiFillDelete size={24} color='white' />
                </div>
              </div>

            </div>
          </div>

        </div>

    </div>

  )
}

export default Chat
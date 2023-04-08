import { useEffect, useState } from 'react'
import { BsSend, BsFillChatLeftDotsFill } from "react-icons/bs"
import { AiFillDelete, AiOutlineCloseCircle } from 'react-icons/ai'
import BotMessage from './BotMessage'
import HumanMessage from './HumanMessage'
import ChatItem from './ChatItem'
import AddChatItem from './AddChatItem'
import axios from 'axios'
import LoadingMessage from './LoadingMessage'
import { toast } from 'react-hot-toast'
import { genDate, askQuestion, deleteAllMessages, createNewConversation } from "../utils/utils.js"

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [conversationsArray, setConversationsArray] = useState([])
  const [newConvName, setNewConvName] = useState('')
  const [loading, setLoading] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openCreateConvModal, setOpenCreateConvModal] = useState(false)
  const apikey = localStorage.getItem('apikey')
  const conversationid = localStorage.getItem('conversationid')

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      pushMessageToArr(currentMessage)
    }
  };

  const getMessages = async (convid) => {
    try {
      const messages = await axios.get(`http://localhost:5000/api/conversation/${convid}`)
      setChatMessages(messages.data.messages)
      return messages
    } catch (error) {
      return error.message
    }
  }

  const getConversations = async () => {
    try {
      const conversations = await axios.get("http://localhost:5000/api/conversation")
      setConversationsArray(conversations.data)
      return conversations
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
    const response = await askQuestion(conversationid, text, apikey)

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
    getMessages(conversationid)
    getConversations()
  }, [])

  return (

    <div className='flex flex-row h-[100%] overflow-x-hidden relative fadeanimation'>

        {openDeleteModal &&
          <div className='shadow-md absolute z-10 flex w-full h-full bg-black bg-opacity-40 justify-center items-center fadeanimation'>
            <div className='flex items-center justify-center bg-gray-200 rounded-md h-[400px] w-[400px] flex-col'>
              
              <AiFillDelete size={40} className='mt-4'/>

              <div className='flex p-4 w-full justify-center text-center text-lg font-bold'>Sei sicuro di voler cancellare la tua cronologia messaggi?</div>

              <div className='flex items-center justify-center gap-3'>
                <div onClick={() => deleteAllMessages(conversationid)} className='bg-green-500 cursor-pointer text-white rounded-md w-[100px] h-[40px] flex font-bold text-lg items-center justify-center hover:bg-green-700 transition'>Si</div>
                <div onClick={() => setOpenDeleteModal(false)} className='bg-red-500 cursor-pointer text-white rounded-md w-[100px] h-[40px] flex font-bold text-lg items-center justify-center hover:bg-red-700 transition'>No</div>
              </div>

            </div>
            
          </div>
        }

        {openCreateConvModal &&
          <div className='shadow-md absolute z-10 flex w-full h-full bg-black bg-opacity-40 justify-center items-center fadeanimation'>
            <div className='relative flex items-center justify-center bg-gray-200 rounded-md h-[400px] w-[400px] flex-col'>
              
              <AiOutlineCloseCircle onClick={() => setOpenCreateConvModal(false)} size={24} className='cursor-pointer absolute top-2 right-2'/>
              <BsFillChatLeftDotsFill size={40} className='mt-4'/>

              <div className='flex p-4 w-full justify-center text-center text-lg font-bold'>Crea una nuova chat!</div>

              <div className='flex items-center justify-center flex-col gap-2'>
                <div>
                  Inserisci un nome da assegnare alla tua chat
                </div>
                <div>
                  <input value={newConvName} onChange={(e) => setNewConvName(e.target.value)} className='border-[1px] p-5 border-black rounded-md bg-transparent h-[40px] w-[250px]'/>
                </div>
              </div>

              <div onClick={() => createNewConversation(newConvName)} className='mt-5 bg-green-500 cursor-pointer text-white rounded-md w-[100px] h-[40px] flex font-bold text-lg items-center justify-center hover:bg-green-700 transition'>Crea</div>

            </div>
            
          </div>
        }

        {/* LEFT SIDE */}
        <div className='overflow-y-auto hidden items-center justify-center md:block md:w-[25%] lg:w-[15%] h-[100%] bg-[#1a1a1a]'>
          
          {conversationsArray.length > 0 &&
            conversationsArray.map((conversation) => {
              return (
                <ChatItem id={conversation._id} label={conversation.name} key={conversation._id}/>
              )
            })
          }
          
          <div onClick={() =>{setOpenCreateConvModal(!openCreateConvModal)}}>
            <AddChatItem />
          </div>
          

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
                <div onClick={() => pushMessageToArr(conversationid, currentMessage)} className='h-10 w-10 bg-[#202329] items-center rounded-md justify-center flex hover:bg-[#3d434e] transition cursor-pointer'>
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
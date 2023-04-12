import { useEffect, useState } from 'react'
import { BsSend } from "react-icons/bs"
import { AiFillDelete } from 'react-icons/ai'
import CreateConvModal from './CreateConvModal'
import BotMessage from './BotMessage'
import HumanMessage from './HumanMessage'
import ChatItem from './ChatItem'
import AddChatItem from './AddChatItem'
import axios from 'axios'
import LoadingMessage from './LoadingMessage'
import { toast } from 'react-hot-toast'
import { genDate, askQuestion, deleteAllMessages, createNewConversation } from "../utils/utils.js"
import DeleteMessageHistory from './DeleteMessageHistory'

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [conversationsArray, setConversationsArray] = useState([])
  const [newConvName, setNewConvName] = useState('')
  const [loading, setLoading] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openCreateConvModal, setOpenCreateConvModal] = useState(false)
  const [convExists, setConvExists] = useState(false)
  const [apikey, setApikey] = useState('')
  const conversationid = localStorage.getItem('conversationid')
  let convIds = []

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if(currentMessage.length > 0){
        pushMessageToArr(currentMessage)
      }
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

  const checkContained = (data) => {
    for (var i = 0; i <= data.length; i++){
      convIds.push(data[i]._id)
    }
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

  useEffect(() => {
    checkContained({conversationsArray})
    conversationsArray.map((conv) => {
      convIds.push(conv._id)
    })
    if(convIds.includes(conversationid)){
      setConvExists(true)
    }else{
      setConvExists(false)
    }
  }, [conversationsArray])

  useEffect(() => {
    if(localStorage.getItem('apikey') === null) {
      console.log('api key not set')
    } else {
      const apikey = localStorage.getItem('apikey')
      setApikey(apikey)
    }
  }, [apikey])

  return (

    <>

        {openCreateConvModal &&
            <CreateConvModal 
                closeModal={() => setOpenCreateConvModal(false)} 
                newConvName={newConvName}
                setNewConvName={(e) => setNewConvName(e.target.value)}
                createNewConv={() => createNewConversation(newConvName)}
            />
        }

        {openDeleteModal &&
          <DeleteMessageHistory 
            deleteAllMessages={() => deleteAllMessages(conversationid)}
            closeDeleteModal={() => setOpenDeleteModal(false)}
          />
        }

    <div className='flex flex-row h-[100%] overflow-x-hidden relative fadeanimation'>


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
          
          {!convExists &&
            (<div className='flex justify-center items-center p-5 font-bold text-gray-600 animate-pulse'>Seleziona una conversazione</div>)
          }

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
          {(convExists && apikey !== '') &&
            <div className='absolute flex items-center justify-center bottom-0 bg-[#2E333F] w-full h-[15%]'>
              <div className='p-5 w-[95%] h-[80%] md:h-[80%] md:w-[90%] lg:w-[60%] bg-transparent flex items-center justify-center rounded-lg border-[1.5px] border-gray-500 overflow-hidden'>
                <input onKeyDown={handleKeyDown} disabled={loading} value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} className='bg-transparent w-full h-full p-5 focus:outline-none text-white' placeholder='Chiedimi qualcosa...'/>

                <div className='flex flex-col gap-2'>
                  <div 
                    onClick={() => pushMessageToArr(currentMessage)} 
                    className={currentMessage.length > 0 ? 'h-9 w-9 bg-[#202329] items-center rounded-md justify-center flex hover:bg-[#3d434e] transition cursor-pointer' : 'h-9 w-9 bg-gray-500 items-center pointer-events-none rounded-md justify-center flex transition cursor-not-allowed'}>
                    <BsSend size={20} color='white' />
                  </div>
                  <div onClick={() => setOpenDeleteModal(!openDeleteModal)} className='h-9 w-9 bg-[#202329] items-center rounded-md justify-center flex hover:bg-[#3d434e] transition cursor-pointer'>
                    <AiFillDelete size={20} color='white' />
                  </div>
                </div>

              </div>
            </div>
          }

          {apikey === '' &&
            <div className='absolute flex items-center justify-center bottom-0 bg-[#2E333F] w-full h-[15%]'>
              <div className='p-5 w-[95%] h-[80%] md:h-[80%] md:w-[90%] lg:w-[60%] bg-transparent flex items-center justify-center rounded-lg border-[1.5px] border-gray-500 overflow-hidden'>
                <div className='text-white font-semibold text-center text-sm'>Per poter utilizzare l'applicazione devi impostare una API key nella pagina 'Impostazioni'</div>
              </div>
            </div>
          }

        </div>

    </div>
    </>

  )
}

export default Chat
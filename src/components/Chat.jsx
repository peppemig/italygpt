import { useEffect, useState } from 'react'
import { BsSend } from "react-icons/bs"
import BotMessage from './BotMessage'
import HumanMessage from './HumanMessage'
import ChatItem from './ChatItem'
import axios from 'axios'
import LoadingMessage from './LoadingMessage'
import { toast } from 'react-hot-toast'
import { format } from "date-fns"

 
const Chat = () => {
  const apikey = localStorage.getItem('apikey')
  const [currentMessage, setCurrentMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const askQuestion = async (question) => {
    const response = await axios.post('http://localhost:5000/api/ask', {data: question, apikey: apikey})
    return response.data
  }

  const genDate = () => {
    const date = new Date
    const formattedDate = format(date, 'hh:mm dd/MM/yyyy')
    return formattedDate
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
    const response = await askQuestion(text)

    const newAnswer = {
      createdAt: genDate(),
      type: 'bot',
      text: response
    }

    setLoading(false)
    setChatMessages([...chatMessages, newMessage, newAnswer])
  }


  // ALWAYS SCROLL TO LAST MESSAGE
  const handleClickScroll = () => {
      const element = document.getElementById(chatMessages.length - 1);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    handleClickScroll()
  }, [chatMessages])


  return (

    <div className='flex flex-row h-[100%] overflow-x-hidden relative'>

        {/* LEFT SIDE */}
        <div className='overflow-y-auto hidden items-center justify-center md:block md:w-[25%] lg:w-[15%] h-[100%] bg-[#1a1a1a]'>

          <ChatItem label="Chat 1"/>
          <ChatItem label="Chat 2"/>
          <ChatItem label="Chat 3"/>
          <ChatItem label="Chat 4"/>
          <ChatItem label="Chat 5"/>
          <ChatItem label="Chat 6"/>

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
              <input disabled={loading} value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} className='bg-transparent w-full h-full p-5 focus:outline-none text-white' placeholder='Cerca qualcosa...'/>
              <div onClick={() => pushMessageToArr(currentMessage)} className='h-12 w-12 bg-[#202329] items-center rounded-md justify-center flex hover:bg-[#3d434e] transition cursor-pointer'>
                <BsSend size={24} color='white' />
              </div>
            </div>
          </div>

        </div>

    </div>

  )
}

export default Chat
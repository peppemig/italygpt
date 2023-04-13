import React, { useEffect, useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai"
import { GiItalia } from "react-icons/gi"
import { AiOutlineGithub } from "react-icons/ai"
import { FaKey } from "react-icons/fa"
import { IoMdSettings } from "react-icons/io"
import { useNavigate } from 'react-router-dom'
import { BsChatDots } from "react-icons/bs"
import axios from "axios"
import { BiMessageSquareAdd } from "react-icons/bi"
import { createNewConversation } from '../utils/utils'
import CreateConvModal from './CreateConvModal'
import NavbarChatItem from './NavbarChatItem'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [chatMenuMobileOpen, setChatMenuMobileOpen] = useState(false)
    const navigate = useNavigate()
    const [conversationsArray, setConversationsArray] = useState([])
    const [openCreateConvModal, setOpenCreateConvModal] = useState(false)
    const [newConvName, setNewConvName] = useState('')

    const getConversations = async () => {
        try {
          const conversations = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/conversation`)
          setConversationsArray(conversations.data)
          return conversations
        } catch (error) {
          return error.message
        }
      }
    
    useEffect(() => {
        getConversations()
    }, [])

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

    <div className='p-5 flex h-[60px] bg-[#131313] w-full items-center justify-between relative'>

        
        <div className='flex items-center justify-center gap-2'>
            <a onClick={() => navigate('/')} className='text-white font-bold text-xl cursor-pointer hover:text-neutral-200 transition'>ItalyGPT</a>
            <GiItalia size={25} color='white'/>
        </div>

        <div className='relative flex gap-3 items-center'>
            <BsChatDots onClick={() => (setChatMenuMobileOpen(!chatMenuMobileOpen),setMenuOpen(false))} color='white' size={20} className='md:hidden cursor-pointer'/>
            <AiOutlineMenu onClick={() => (setMenuOpen(!menuOpen), setChatMenuMobileOpen(false))} size={20} color='white' className='cursor-pointer'/>
            
            {menuOpen && 
                (
                    <div className='fadeanimationfast items-center justify-center z-20 absolute right-1 top-8 w-[200px] bg-[#2E343D] rounded-md overflow-hidden shadow-md'>
                        <a href='https://platform.openai.com/account/api-keys' target='_blank' className='flex bg-green-500 cursor-pointer hover:bg-green-300 items-center justify-start pl-3 transition'>
                            <FaKey color='white' size={25}/>
                            <h1 className='p-3 text-white font-bold text-md transition'>Genera API Key</h1>
                        </a>
                        <div onClick={() => navigate('/settings')} className='flex bg-white items-center justify-start cursor-pointer pl-3 hover:bg-neutral-200 transition'>
                            <IoMdSettings color='black' size={25}/>
                            <h1 className='p-3 text-black font-bold text-md cursor-pointer'>Impostazioni</h1>
                        </div>
                        <a href='https://github.com/peppemig/italygpt' target='_blank' className='flex bg-red-500 cursor-pointer hover:bg-red-300 items-center justify-start pl-3 transition'>
                            <AiOutlineGithub color='white' size={25}/>
                            <h1 className='p-3 text-white font-bold text-md'>Git Hub</h1>
                        </a>
                    </div>
                )
            }

            {chatMenuMobileOpen &&
                (
                    <div className='md:hidden fadeanimationfast items-center justify-center z-20 absolute right-6 top-8 w-[200px] bg-[#2E343D] rounded-md overflow-hidden shadow-md'>
                        
                        {conversationsArray.length > 0 &&
                            conversationsArray.map((conversation) => {
                                return (
                                    <NavbarChatItem id={conversation._id} label={conversation.name} key={conversation._id} />
                                )
                            })
                        }

                            {conversationsArray.length > 0 && (<hr />)}
                            <div onClick={() => (setOpenCreateConvModal(!openCreateConvModal), setChatMenuMobileOpen(false))} className='flex flex-row items-center justify-between h-full w-full p-3 hover:bg-neutral-800 transition cursor-pointer'>
                                <BiMessageSquareAdd size={20} color='white'/>
                                <div className='flex h-full items-center text-white font-semibold transition cursor-pointer w-[70%] truncate'>Nuova chat</div>
                            </div>

                    </div>
                )
            }

        </div>

    </div>
    </>
  )
}

export default Navbar
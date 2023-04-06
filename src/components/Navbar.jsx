import React, { useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai"
import { GiItalia } from "react-icons/gi"
import { AiOutlineGithub } from "react-icons/ai"
import { FaKey } from "react-icons/fa"
import { IoMdSettings } from "react-icons/io"

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)


  return (
    <div className='p-5 flex h-[60px] bg-[#131313] w-full items-center justify-between'>
        
        <div className='flex items-center justify-center gap-2'>
            <h1 className='text-white font-bold text-xl cursor-pointer hover:text-neutral-200 transition'>ItalyGPT</h1>
            <GiItalia size={25} color='white'/>
        </div>

        <div className='relative'>
            <AiOutlineMenu onClick={() => setMenuOpen(!menuOpen)} size={20} color='white' className='cursor-pointer'/>
            {menuOpen && 
                (
                    <div className='fadeanimationfast items-center justify-center z-10 absolute right-1 top-8 w-[200px] bg-[#2E343D] rounded-md overflow-hidden shadow-md'>
                        <div className='flex bg-green-500 cursor-pointer hover:bg-green-300 items-center justify-start pl-3 transition'>
                            <FaKey color='white' size={25}/>
                            <h1 className='p-3 text-white font-bold text-md transition'>Genera API Key</h1>
                        </div>
                        <div className='flex bg-white items-center justify-start cursor-pointer pl-3 hover:bg-neutral-200 transition'>
                            <IoMdSettings color='black' size={25}/>
                            <h1 className='p-3 text-black font-bold text-md cursor-pointer'>Impostazioni</h1>
                        </div>
                        <div className='flex bg-red-500 cursor-pointer hover:bg-red-300 items-center justify-start pl-3 transition'>
                            <AiOutlineGithub color='white' size={25}/>
                            <h1 className='p-3 text-white font-bold text-md'>Git Hub</h1>
                        </div>
                    </div>
                )
            }
        </div>

    </div>
  )
}

export default Navbar
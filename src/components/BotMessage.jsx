import React from 'react'
import { AiFillRobot } from "react-icons/ai"

const BotMessage = ({message}) => {
  return (
        <div className='flex justify-start fadeanimation'>
            <div className='m-3 flex bg-[#2E343D] w-[90%] lg:w-[60%] rounded-md text-white overflow-hidden shadow-md'>
                <div className='flex h-full w-[10%] p-3 items-center justify-center'>
                    <AiFillRobot size={30}/>
                </div>
                <div className='flex h-full justify-start w-[90%] p-3'>
                    {message}
                </div>
            </div>
        </div>
  )
}

export default BotMessage
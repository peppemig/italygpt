import React from 'react'
import { BsFillPersonFill} from "react-icons/bs"

const HumanMessage = ({message}) => {
  return (
    <div className='flex justify-end fadeanimation'>
        <div className='m-3 flex bg-[#2E343D] w-[90%] lg:w-[60%] rounded-md text-white overflow-hidden shadow-md'>
            <div className='flex justify-end h-full w-[90%] p-3'>
            {message}
            </div>
            <div className='flex h-full w-[10%] p-3 items-center justify-center'>
            <BsFillPersonFill size={30}/>
            </div>
        </div>
    </div>

  )
}

export default HumanMessage
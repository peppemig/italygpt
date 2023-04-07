import React from 'react'
import { BsFillPersonFill} from "react-icons/bs"

const HumanMessage = ({createdAt, id, message}) => {

  return (
    <div id={id} className='flex justify-end fadeanimation'>
        <div className='m-3 flex bg-[#2E343D] w-[90%] lg:w-[60%] rounded-md text-white overflow-hidden shadow-md'>
            <div className='flex h-full w-[90%] p-3 flex-col'>

              <div className='flex text-md justify-end'>{message}</div>
              <div className='flex text-sm text-gray-400 justify-end'>{createdAt}</div>
            
            </div>
            <div className='flex h-full w-[10%] p-3 items-center justify-center'>
            <BsFillPersonFill size={30}/>
            </div>
        </div>
    </div>

  )
}

export default HumanMessage
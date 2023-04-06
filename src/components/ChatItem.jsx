import { BsChatDots } from "react-icons/bs"

const ChatItem = ({label}) => {
  return (
    <div className='fadeanimation flex items-center gap-2 rounded-md m-4 p-5 text-white border-[1px] cursor-pointer hover:bg-neutral-500 transition'>
        <BsChatDots size={20}/>
        <div>{label}</div>
  </div>
  )
}

export default ChatItem
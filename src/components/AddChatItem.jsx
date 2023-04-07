import { BiMessageSquareAdd } from "react-icons/bi"

const ChatItem = () => {
  return (
    <div className='fadeanimation flex items-center gap-2 rounded-md m-4 p-5 text-gray-500 border-[1px] border-gray-500 cursor-pointer hover:bg-neutral-700 transition'>
        <BiMessageSquareAdd color="#6B7280" size={20}/>
        <div className="truncate">Nuova chat</div>
    </div>
  )
}

export default ChatItem
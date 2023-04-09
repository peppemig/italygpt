import { AiOutlineCloseCircle } from "react-icons/ai"
import { BsFillChatLeftDotsFill } from "react-icons/bs"

const CreateConvModal = ({closeModal, newConvName, setNewConvName, createNewConv}) => {
  return (
    <div className='shadow-md absolute z-10 flex w-full h-full bg-black bg-opacity-40 justify-center items-center fadeanimation'>
          <div className='relative flex items-center justify-center bg-gray-200 rounded-md h-[400px] w-[400px] flex-col'>
            
            <AiOutlineCloseCircle onClick={closeModal} size={24} className='cursor-pointer absolute top-2 right-2'/>
            <BsFillChatLeftDotsFill size={40} className='mt-4'/>

            <div className='flex p-4 w-full justify-center text-center text-lg font-bold'>Crea una nuova chat!</div>

            <div className='flex items-center justify-center flex-col gap-2'>
              <div>
                Inserisci un nome da assegnare alla tua chat
              </div>
              <div>
                <input value={newConvName} onChange={setNewConvName} className='border-[1px] p-5 border-black rounded-md bg-transparent h-[40px] w-[250px]'/>
              </div>
            </div>

            <div onClick={createNewConv} className='mt-5 bg-green-500 cursor-pointer text-white rounded-md w-[100px] h-[40px] flex font-bold text-lg items-center justify-center hover:bg-green-700 transition'>Crea</div>

          </div>
          
    </div>
  )
}

export default CreateConvModal
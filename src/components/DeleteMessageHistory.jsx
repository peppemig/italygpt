import { AiFillDelete } from 'react-icons/ai'

const DeleteMessageHistory = ({deleteAllMessages, closeDeleteModal}) => {
  return (
    <div className='shadow-md absolute z-10 flex w-full h-full bg-black bg-opacity-40 justify-center items-center fadeanimation'>
            <div className='flex items-center justify-center bg-gray-200 rounded-md h-[400px] w-[400px] flex-col'>
              
              <AiFillDelete size={40} className='mt-4'/>

              <div className='flex p-4 w-full justify-center text-center text-lg font-bold'>Sei sicuro di voler cancellare la tua cronologia messaggi?</div>

              <div className='flex items-center justify-center gap-3'>
                <div onClick={deleteAllMessages} className='bg-green-500 cursor-pointer text-white rounded-md w-[100px] h-[40px] flex font-bold text-lg items-center justify-center hover:bg-green-700 transition'>Si</div>
                <div onClick={closeDeleteModal} className='bg-red-500 cursor-pointer text-white rounded-md w-[100px] h-[40px] flex font-bold text-lg items-center justify-center hover:bg-red-700 transition'>No</div>
              </div>

            </div>
            
        </div>
  )
}

export default DeleteMessageHistory
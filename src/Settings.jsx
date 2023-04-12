import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { addApiKey } from './redux/actions/apikeyActions'
import { toast } from "react-hot-toast"

const Settings = () => {
  const [apiKeyText, setApiKeyText] = useState('')
  const [apikey, setApikey] = useState('')
  const dispatch = useDispatch()

  const setApiKey = (apikey) => {
    if(apikey.length !== 51){
      toast.error('Lunghezza API key non corretta')
      return
    }

    dispatch(addApiKey(apikey))
    setApiKeyText('')
    toast.success('API key impostata correttamente')

    setTimeout(() => {
      window.location.reload(false);
    }, "1000")
  }
  
  useEffect(() => {
    if(localStorage.getItem('apikey') === null) {
      console.log('api key not set')
    } else {
      const apikey = localStorage.getItem('apikey')
      setApikey(apikey)
    }
  }, [apikey])

  return (
    
    <div className='flex h-[100vh] w-full bg-[#202329] flex-col'>
        
        <Navbar/>
        
        <div className='fadeanimation flex flex-col justify-center items-center gap-3 m-12'>
          <h1 className='text-xl text-white font-bold'>Imposta la tua API key</h1>
          <input value={apiKeyText} onChange={(e) => setApiKeyText(e.target.value)} className='rounded-md p-5 h-[20px] w-content' placeholder='Inserisci API key' />
          <div onClick={() => setApiKey(apiKeyText)} className='cursor-pointer bg-green-500 hover:bg-green-300 transition px-5 py-2 rounded-md font-bold text-white'>
            Salva
          </div>
          <div className='flex items-center justify-center mt-5 gap-1'>
            <h1 className='text-white'>
              Non hai una API key?
            </h1>
            <a href='https://platform.openai.com/account/api-keys' target='_blank' className='font-bold text-white hover:text-neutral-400 transition cursor-pointer'>
              Ottienila qui
            </a>
          </div>

          <div className='mt-10 flex flex-col md:flex-row justify-center items-center gap-2'>
            <div className='text-lg font-semibold text-white'>
              La tua API key attuale: 
            </div>
            <div className='p-5 items-center justify-center flex bg-transparent border-[1px] w-content h-[20px] rounded-md'>
              <div className='flex text-white'>
                {apikey !== undefined && apikey.substring(0,3) + '*****' + apikey.slice(-4)}
              </div>
            </div>
          </div>
        </div>
        

    </div>
  )
}

export default Settings
import { useState } from 'react'
import Navbar from './components/Navbar'
import Chat from './components/Chat'

function App() {


  return (
    <div className='flex h-[100vh] w-full bg-[#202329] flex-col'>

      <Navbar/>

      <Chat />

    </div>
  )
}

export default App

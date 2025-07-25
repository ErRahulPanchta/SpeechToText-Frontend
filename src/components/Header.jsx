import React from 'react'
import logo from "../assets/logo.svg"

const Header = () => {
  return (
    <header className='flex justify-between items-center border-b border-slate-400 min-h-[15vh] w-[75vw] p-4'>
      <div className='flex'>
        <h1 className='text-3xl ml-[25vw] text-slate-200 font-semibold'>Speech To Text</h1>
      </div>
      <div className='flex justify-between items-center '>

        <img
          src={logo}
          alt='speech to text'
          width={62}
        />
      </div>
    </header>
  )
}
export default Header
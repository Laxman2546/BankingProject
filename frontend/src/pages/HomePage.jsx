import React from 'react'
import {  BsBank } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { FaWallet } from "react-icons/fa6";
const HomePage = () => {
  return (
    <div className='w-full h-screen bg-gray-100 p-3'>
    <nav className='w-full flex flex-row items-center pr-12 justify-between'>
      <div className= "flex flex-row items-center">
      <BsBank size={50} className="m-4 bg-primary rounded-2xl p-3  text-white"/>
     <h1 className="text-black font-medium text-lg">Coder's Bank</h1>
      </div>
      <div className='flex flex-row gap-2 bg-red-500 p-2 rounded-lg items-center '>
      <button className='text-white font-semiBold'>Logout</button>
      <LuLogOut size={20} className="text-white"/>
      </div>

    </nav>
    <div className='p-5 '>
      <h1 className='text-2xl font-semibold '>Welcome Back, Lakshman</h1>
      <p className="text-gray-400 text-md ">here's your account overview</p>
    </div>
    <div className='w-full p-5 flex flex-col items-start'>
      <div className='w-full bg-white p-5 rounded-lg '>
        <div className='max-w-1/2 flex flex-row justify-between'>
        <h2 className='text-xl font-semibold '>Current Balance</h2>
        <FaWallet size={40} className="mt-4 text-primary"/>
        </div>
        <p className='text-3xl font-bold'>$12,345.67</p>
      </div>
    </div>
    </div>
  )
}

export default HomePage

import React from 'react'
import {  BsBank } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { FaWallet } from "react-icons/fa6";
import Cards from "../components/Cards"
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const navigate = useNavigate();
  const handleLogout = () =>{
    navigate("/login");
  }
  return (
    <div className='w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3'>
    <nav className='w-full flex flex-row items-center pr-12 justify-between bg-gray-100 '>
      <div className= "flex flex-row items-center">
      <BsBank size={50} className="m-4 bg-primary rounded-2xl p-3  text-white"/>
     <h1 className="text-black font-medium text-lg">Coder's Bank</h1>
      </div>
      <div className='flex flex-row gap-2 bg-red-500 p-2 rounded-lg items-center '>
      <button className='text-white font-semiBold cursor-pointer' onClick={handleLogout}>Logout</button>
      <LuLogOut size={20} className="text-white"/>
      </div>

    </nav>
    <div className='p-5 '>
      <h1 className='text-2xl font-semibold '>Welcome Back, Lakshman</h1>
      <p className="text-gray-400 text-md ">here's your account overview</p>
    </div>
    <Cards/>
    </div>
  )
}

export default HomePage

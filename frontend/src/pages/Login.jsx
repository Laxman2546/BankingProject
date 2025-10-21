import React, { useState } from "react";
import logo from "../assets/logo.png";
import chip from "../assets/chip.png";
const Login = () => {
  const [name,setName] = useState();
  const [cvv,setCvv] = useState();
  const [displayValue, setDisplayValue] = useState("");
  const [accountNumber,setAcountNumber] = useState();
  const  [valid,setValid] = useState();
  const [pin,setPin] = useState();
  const [isRotated,setIsrotated] = useState(false)
  const handleCardrotate = () =>{
    setIsrotated(true);
  }

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ""); 
    setAcountNumber(rawValue);
    
    const formatNumber = (num) => {
      if (num.length <= 4) {
        return num;
      } else if (num.length <= 8) {
        return `${num.slice(0, 4)} ${num.slice(4)}`;
      } else if (num.length <= 12) {
        return `${num.slice(0, 4)} XXXX ${num.slice(-4)}`;
      } else {
        return `${num.slice(0, 4)} XXXX XXXX ${num.slice(-4)}`;
      }
    };

    if (rawValue.length <= 16) { 
      setDisplayValue(formatNumber(rawValue));
    }
  };
  return (
    <div className="w-full min-h-screen flex flex-row items-center  ">
      <div className="w-1/2 flex flex-col gap-5  p-20">
        <h1 className="text-2xl font-semibold">Get started!</h1>
        <div className="flex flex-col">
          <label className="p-2 font-medium">Name</label>
          <input
            type="text"
            onChange={(e)=>{
              setName(e.target.value)
            }}
            value={name}
            placeholder="Enter your name"
            className="border-2  border-gray-500 pr-1 max-w-[350px] p-2 rounded-2xl placeholder:text-gray-500 outline-none pl-3"
          />
        </div>
        <div className="flex flex-col">
          <label className="p-2 font-medium">Account Number</label>
             <input
  type="text"
  placeholder="Enter your Account number"
  onChange={handleChange}
  value={displayValue}
            className="arrow border-2  border-gray-500 pr-1 max-w-[350px] p-2 rounded-2xl placeholder:text-gray-500 outline-none pl-3"

/>
   
        </div>
        <div className="flex flex-col">
          <label className="p-2 font-medium">CVV</label>
          <input
            type="number"
            placeholder="Enter your CVV number"
            onChange={(e) => setCvv(e.target.value)}
            value={cvv?cvv.length>3?cvv.slice(0,3):cvv:""}
            onFocus={handleCardrotate}
            className="border-2  border-gray-500 pr-1 max-w-[350px] p-2 rounded-2xl placeholder:text-gray-500 outline-none pl-3"
          />
        </div>
        <div className="flex flex-col">
          <label className="p-2 font-medium">Pin</label>
          <input
            type="password"
            value={pin ? pin.length>4?pin.slice(0,4):pin:""}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter your pin number"
            className="border-2  border-gray-500 pr-1 max-w-[350px] p-2 rounded-2xl placeholder:text-gray-500 outline-none pl-3"
          />
        </div>
        <div className="w-full bg-primary flex items-center justify-center max-w-[350px] p-3 rounded-2xl">
          <button className="text-center text-white font-medium">Register Account</button>
        </div>
      </div>
      {
        !isRotated ? (<div className="w-[450px] bg-black p-5 rounded-3xl">

        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-1">
            <img src={logo} />
            <p className="text-white flex items-center text-nowrap text-lg">Master Card</p>
          </div>
          <div>
          <img src={chip} className="w-[70px] h-[70px]"/>
          </div>
        </div>  
          <div className="text-white flex flex-col gap-1 p-5">
            <p className="text-md ">Card Number</p>
            <p className="text-2xl">
              {accountNumber 
                ? accountNumber.length <= 4
                  ? accountNumber
                  : accountNumber.length <= 8
                    ? `${accountNumber.slice(0, 4)} ${accountNumber.slice(4)}`
                    : accountNumber.length <= 12
                      ? `${accountNumber.slice(0, 4)} XXXX ${accountNumber.slice(-4)}`
                      : `${accountNumber.slice(0, 4)} XXXX XXXX ${accountNumber.slice(-4)}`
                : "1234 XXXX XXXX 3456"}
            </p>
          </div>
          <div className="pl-5 flex flex-row justify-between items-center pr-3">
            <p className="text-white">{name ? name : "username"}</p>
            <div className="text-white flex flex-col">
              <p>Valid Thru</p>
              <p>08/12</p>
            </div>
          </div>

      </div>) : (
        <>
        <div className="w-[450px] bg-black p-5 rounded-3xl">
        

      </div>
      </>
      )    
      }
      
    </div>
  );
};

export default Login;

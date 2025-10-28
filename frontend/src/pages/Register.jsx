import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import chip from "../assets/chip.png";
import { Link } from "react-router-dom";
import axios from "axios";
const Register = () => {
      const [name, setName] = useState("");
      const [cvv, setCvv] = useState("");
      const [accountNumber, setAccountNumber] = useState("");
      const [pin, setPin] = useState("");
      const [valid, setValid] = useState("");
      const [isRotated, setIsRotated] = useState(false);
      const[showcard,setshowcard]=useState(false);
      const [userDetails,setUserDetails] = useState([]);

      const getData = async() =>{
        try{
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/users`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          console.log("Response:", response.data);
        }catch(e){
          console.error("Error fetching users:", e.response?.data || e.message);
        }
      }

      useEffect(() =>{
        getData();
      },[])
      const handleAccountNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 16) {
          setAccountNumber(value);
        }
      };
      
      const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 3) {
          setCvv(value);
        }
      };
    
      const handlePinChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 4) {
          setPin(value);
        }
      };
    
      const formatCardNumber = (cleanNumber) => {
        if (!cleanNumber) return "1234 XXXX XXXX 2546";
    
         
        const len = cleanNumber.length;
    
        if (len <= 4) return cleanNumber;
        if (len <= 8)
          return `${cleanNumber.slice(0, 4)} ${cleanNumber.slice(4, 8)}`;
        if (len <= 12)
          return `${cleanNumber.slice(0, 4)} XXXX ${cleanNumber.slice(8)}`;
    
        return `${cleanNumber.slice(0, 4)} XXXX XXXX ${cleanNumber.slice(12)}`;
      };
    
      const handleValid = (e) => {
        const value = e.target.value.replace(/\D/g, "");
    
        if (value.length <= 2) {
          setValid(value);
        } else if (value.length <= 4) {
          setValid(`${value.slice(0, 2)} / ${value.slice(2)}`);
        } else {
          setValid(`${value.slice(0, 2)} / ${value.slice(2, 4)}`);
        }
      };
const handleLogin = async() =>{
  try{
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/users/find`,{
      name,
      pin
    },
    {
      withCredentials:true
    });
    console.log(response,"response");
    if(response.status == 200){
      setUserDetails(response.data);
      setshowcard(true);
    }
  }catch(e){
    console.log(e,"something went wrong while submitting the details")
  }
}

  return (
     <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center gap-2 p-4 lg:p-8">
        {showcard ?(
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center perspective ">
          <div
            className={`relative w-full max-w-[350px] sm:max-w-[400px] md:max-w-[450px] h-[220px] sm:h-[250px] shadow-2xl transition-transform duration-700 transform-style-3d ${
              isRotated ? "rotate-y-180" : ""
            }`}
            onMouseOver={()=>setIsRotated(true)}
            onMouseOut={()=>setIsRotated(false)}
          >
            <div
              className={`absolute inset-0 w-full h-full bg-black p-4 sm:p-5 rounded-3xl backface-hidden ${
                isRotated ? "opacity-0" : "opacity-100"
              } transition-opacity duration-300`}
            >
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2 items-center">
                  <img
                    src={logo}
                    alt="Master Card Logo"
                    className="w-8 h-8 sm:w-15 sm:h-15"
                  />
                  <p className="text-white text-sm sm:text-lg font-medium">
                    Master Card
                  </p>
                </div>
                <div>
                  <img
                    src={chip}
                    alt="Chip"
                    className="w-12 h-12 sm:w-20 sm:h-20"
                  />
                </div>
              </div>
  
              <div className="text-white flex flex-col gap-2 p-4 pl-2 sm:p-2">
                <p className="text-sm sm:text-md pl-1">Card Number</p>
                <p className="text-xl sm:text-2xl -pl-2 tracking-wider">
                  {formatCardNumber(userDetails.accountNumber)}
                </p>
              </div>
  
              <div className="pl-3 sm:pl-3 flex flex-row justify-between items-center pr-3 text-start">
                <p className="text-white text-sm sm:text-base font-medium truncate max-w-[60%]">
                  {userDetails.name ? userDetails.name : "username"}
                </p>
                <div className="text-white flex flex-col text-center">
                  <p className="text-xs sm:text-sm">Valid Thru</p>
                  <p className="text-sm sm:text-base font-mono">
                    {userDetails.valid ? userDetails.valid : "MM/YY"}
                  </p>
                </div>
              </div>
            </div>
  
            <div
              className={`absolute inset-0 w-full h-full bg-black rounded-3xl backface-hidden rotate-y-180 ${
                isRotated ? "opacity-100" : "opacity-0"
              } transition-opacity duration-300`}
            >
              <div className="flex flex-col h-full">
                <p className="text-[0.55rem] sm:text-[0.6rem] text-center p-4 sm:p-5 text-gray-300">
                  For customer service call +977 4343 3433 or email at
                  mastercard@gmail.com
                </p>
  
                <div className="w-full h-8 sm:h-12 bg-gray-600 mt-2"></div>
  
                <div className="w-full p-4 sm:p-5 flex flex-row items-center mt-2">
                  <div className="h-8 sm:h-12 w-full bg-[repeating-linear-gradient(#fff_0_2px,#efefef_2px_6px)]"></div>
                  <div className="bg-white text-black p-1 sm:p-2 rounded-r-lg text-xs sm:text-sm font-mono min-w-[40px] text-center">
                    {userDetails.cvv ? userDetails.cvv : "***"}
                  </div>
                </div>
  
                <p className="text-[0.55rem] sm:text-[0.6rem] text-center px-4 sm:px-5 pb-4 mt-2 text-gray-300">
                  Authorized signature — not valid unless signed. Do not share
                  your CVV or PIN.
                </p>
              </div>
            </div>
          </div>
          <Link to={"/homepage"}>
          <button  className="mt-6  bg-primary flex items-center justify-center p-3 rounded-2xl hover:bg-secondary transition-colors cursor-pointer text-white font-semibold" onClick={()=>setshowcard(false)}>
           Confirm Details
          </button>
          </Link>
          
        </div>
        ):(
 <div className="w-full lg:w-1/2 flex flex-col gap-3 max-w-md  p-6 lg:p-8 rounded-3xl ">
          <h1 className="text-2xl font-semibold">Welcome Back!</h1>
      <form onSubmit={(e) =>{
            e.preventDefault();
            handleLogin();
           }}>

          <div className="flex flex-col">
            <label className="p-2 font-medium">Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setIsRotated(false)}
              value={name}
              placeholder="Enter your name"
              className="border-2 border-gray-500 w-full p-3 rounded-2xl placeholder:text-gray-500 outline-none pl-4  transition-colors"
            />
          </div>
          <div className="flex flex-col">
            <label className="p-2 font-medium">Pin</label>
            <input
              type="password"
              value={pin}
              onChange={handlePinChange}
              onFocus={() => setIsRotated(false)}
              placeholder="Enter your pin number"
              maxLength="4"
              className="border-2 border-gray-500 w-full p-3 rounded-2xl placeholder:text-gray-500 outline-none pl-4  transition-colors"
            />
          </div>
  
          <button type="submit" className="w-full bg-primary flex items-center justify-center p-3 rounded-2xl hover:bg-secondary transition-colors cursor-pointer text-white font-semibold" >
           Login Account
          </button>
        </form>

          <div>
            <p className="text-center">
             Don't have an account?
              <Link to="/" className="cursor-pointer hover:underline hover:text-primary">
                Register
              </Link >
            </p>
          </div>
        </div>
        )}
       
      </div>
  )
}

export default Register

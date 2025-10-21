import React from "react";
import logo from "../assets/logo.png";
const Login = () => {
  return (
    <div className="w-full min-h-screen flex flex-row items-center  ">
      <div className="w-1/2 flex flex-col gap-5  p-20">
        <h1 className="text-2xl font-semibold">Get started!</h1>
        <div className="flex flex-col">
          <label className="p-2 font-medium">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="border-2  border-gray-500 pr-1 max-w-[350px] p-2 rounded-2xl placeholder:text-gray-500 outline-none pl-3"
          />
        </div>
        <div className="flex flex-col">
          <label className="p-2 font-medium">Account Number</label>
          <input
            type="text"
            placeholder="Enter your Account number"
            className="border-2  border-gray-500 pr-1 max-w-[350px] p-2 rounded-2xl placeholder:text-gray-500 outline-none pl-3"
          />
        </div>
        <div className="flex flex-col">
          <label className="p-2 font-medium">CVV</label>
          <input
            type="text"
            placeholder="Enter your CVV number"
            className="border-2  border-gray-500 pr-1 max-w-[350px] p-2 rounded-2xl placeholder:text-gray-500 outline-none pl-3"
          />
        </div>
        <div className="flex flex-col">
          <label className="p-2 font-medium">Pin</label>
          <input
            type="text"
            placeholder="Enter your pin number"
            className="border-2  border-gray-500 pr-1 max-w-[350px] p-2 rounded-2xl placeholder:text-gray-500 outline-none pl-3"
          />
        </div>
        <div className="w-full bg-amber-300 flex items-center justify-center max-w-[350px] p-3 rounded-2xl">
          <button className="text-center">Register Account</button>
        </div>
      </div>
      <div className="bg-black p-5">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <img src={logo} className="w-[50px] h-[50px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { use } from "react";
import { BsBank } from "react-icons/bs";
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const removeAccount = localStorage.removeItem("accountdetails");
    navigate("/login");
  };
  return (
    <nav className="w-full flex flex-row items-center pr-12 justify-between bg-gray-100 ">
      <Link to={"/homepage"}>
        <div className="flex flex-row items-center">
          <BsBank
            size={50}
            className="m-4 bg-primary rounded-2xl p-3  text-white"
          />
          <h1 className="text-black font-medium text-lg">Coder's Bank</h1>
        </div>
      </Link>

      <div className="flex flex-row gap-2 bg-red-500 p-2 rounded-lg items-center ">
        <button
          className="text-white font-semiBold cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
        <LuLogOut size={20} className="text-white" />
      </div>
    </nav>
  );
};

export default Navbar;

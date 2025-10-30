import React, { useEffect, useState } from "react";
import { BsBank } from "react-icons/bs";
import { LuCopy, LuLogOut } from "react-icons/lu";
import Cards from "../components/Cards";
import { useNavigate } from "react-router-dom";
import DepositModal from "../components/DepositModal";
import axios from "axios";
import { FaRegCheckCircle } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [showDeposit, setshowDeposit] = useState(false);
  const [balance, setBalance] = useState("");
  const [recentDeposit, setRecentDeposit] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [type,setType] = useState("")
  const [isCopied,setisCopied] = useState(false)
  const [modalType, setModalType] = useState("");
  const [upiId, setUpiId] = useState("");
  const [userId, setUserId] = useState("");

  const handleLogout = () => {
    const removeAccount = localStorage.removeItem("accountdetails");
    navigate("/login");
  };
  useEffect(() => {
    const username = localStorage.getItem("accountdetails");
    if (!username) {
      navigate("/login");
    } else {
      const userName = JSON.parse(username).username;
      const userAccountNumber = JSON.parse(username).accountnumber;
      const uniqueId = JSON.parse(username).id;
      const userUpiId = JSON.parse(username).upi;
      setName(userName);
      setAccountNumber(userAccountNumber);
      setUserId(uniqueId);
      getBalance(uniqueId);
      setUpiId(userUpiId);
    }
  }, [navigate, showDeposit]);
  const handleDeposit = () => {
    setModalType("deposit");
    setshowDeposit(true);
  };
  const getBalance = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/transactions/getbalance/${id}`,
        { withCredntials: true }
      );
      setBalance(response.data.balance);
      setTransactionDate(response.data.transactionDate);
      setRecentDeposit(response.data.amount);
      setType(response.data.transactionType);;
    } catch (e) {
      console.log(e);
    }
  };

  const handleDepositSuccess = () => {
    console.log("Deposit was successful, you might want to refresh data.");
  };
  const handleWithdraw = () => {
    setModalType("withdraw");
    setshowDeposit(true);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setisCopied(true)
    setTimeout(() => {
      setisCopied(false)
    }, 2000);
  };
  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3">
      <nav className="w-full flex flex-row items-center pr-12 justify-between bg-gray-100 ">
        <div className="flex flex-row items-center">
          <BsBank
            size={50}
            className="m-4 bg-primary rounded-2xl p-3  text-white"
          />
          <h1 className="text-black font-medium text-lg">Coder's Bank</h1>
        </div>
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
      {showDeposit && (
        <DepositModal
          accountNumber={accountNumber}
          onClose={() => setshowDeposit(false)}
          modalType={modalType}
          balance={balance}
          onDepositSuccess={handleDepositSuccess}
        />
      )}
      <div className="p-5">
        <h1 className="text-2xl font-semibold ">Welcome Back, {name}</h1>
        <p className="text-gray-400 text-md ">here's your account overview</p>
      <div className="max-w-fit mt-5 gap-5  p-3 flex items-center  border-1 rounded-xl border-gray-200 bg-gray-100">
        <p>UPI ID: {upiId}</p>
        {isCopied ? <FaRegCheckCircle />:        <LuCopy className="cursor-pointer" onClick={handleCopy}/>
}
      </div>
      </div>
      <Cards
        handleDeposit={handleDeposit}
        balance={balance}
        recentDeposit={recentDeposit}
        date={transactionDate}
        handleWithdraw={handleWithdraw}
        transactiontype={type}
      />
    </div>
  );
};

export default HomePage;

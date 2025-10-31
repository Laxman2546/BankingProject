import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
const Transactions = () => {
  const data = localStorage.getItem("accountdetails");
  const accountNumber = JSON.parse(data).accountnumber;
  const getTransactions = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URI
        }/api/transactions/gettransactions/${accountNumber}`
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col mt-2 p-5">
        <h1 className="text-2xl font-bold">Your Transactions</h1>
      </div>
    </div>
  );
};

export default Transactions;

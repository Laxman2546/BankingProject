import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { downloadPDF } from "../config/download";
import { formatDate, formatTime, formatAccount, getTransactionConfig } from "../utils/transactionUtils";

const Transactions = () => {
  const [transactionsData, setTransactionsData] = useState([]);
  const data = localStorage.getItem("accountdetails");
  const accountNumber = JSON.parse(data).accountnumber;
  const accountDetails = JSON.parse(data);
  const [isDownloading, setIsDownloading] = useState(false);

  const getTransactions = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URI
        }/api/transactions/gettransactions/${accountNumber}`
      );
      console.log(response.data);
      setTransactionsData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePdfDownload = () => {
    downloadPDF(accountNumber, transactionsData, accountDetails);
  };
  useEffect(() => {
    getTransactions();
  }, []);



  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 mt-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8 px-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Your Transactions
          </h1>

          {transactionsData.length > 0 && (
            <button
              onClick={handlePdfDownload}
              disabled={isDownloading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-secondary disabled:bg-orange-300 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 text-sm sm:text-base"
            >
              {isDownloading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Download PDF</span>
                </>
              )}
            </button>
          )}
        </div>

        <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-6 gap-4 p-6 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div>TRANSACTION ID</div>
            <div>DATE & TIME</div>
            <div>DETAILS</div>
            <div>TYPE</div>
            <div className="text-right">AMOUNT</div>
            <div className="text-right">BALANCE</div>
          </div>

          <div className="divide-y divide-gray-200">
            {transactionsData.map((transaction, idx) => {
              const config = getTransactionConfig(
                transaction.transactionType,
                transaction.amount,
                transaction.senderAccount,
                transaction.receiverAccount,
                accountNumber
              );

              return (
                <div
                  key={idx}
                  className="grid grid-cols-6 gap-4 p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <p className="text-sm font-mono text-gray-700">
                      #{transaction.id}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-gray-800">
                        {formatDate(transaction.transactionDate)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatTime(transaction.transactionDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex flex-col space-y-1">
                      {transaction.senderAccount != 0 && (
                        <p className="text-xs text-gray-600">
                          From: {formatAccount(transaction.senderAccount)}
                        </p>
                      )}
                      <p className="text-xs text-gray-600">
                        To: {formatAccount(transaction.receiverAccount)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
                    >
                      {config.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-end">
                    <p
                      className={`text-sm font-semibold ${
                        config.sign === "+"
                          ? "text-green-600"
                          : config.sign === "-"
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {config.sign} ${transaction.amount}
                    </p>
                  </div>

                  <div className="flex items-center justify-end">
                    <p className="text-sm font-semibold text-gray-800">
                      ${transaction.balance}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {transactionsData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No transactions found</p>
            </div>
          )}
        </div>

        {/* Mobile & Tablet View - Card Layout */}
        <div className="lg:hidden space-y-3 sm:space-y-4">
          {transactionsData.map((transaction, idx) => {
            const config = getTransactionConfig(
              transaction.transactionType,
              transaction.amount,
              transaction.senderAccount,
              transaction.receiverAccount,
              accountNumber
            );

            return (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-gray-50 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}
                    >
                      {config.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-mono">
                    #{transaction.id}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-3 sm:p-4 space-y-3">
                  {/* Amount & Balance - Most Important Info */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Amount</p>
                      <p
                        className={`text-xl sm:text-2xl font-bold ${
                          config.sign === "+"
                            ? "text-green-600"
                            : config.sign === "-"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {config.sign} ${transaction.amount}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Balance</p>
                      <p className="text-lg sm:text-xl font-semibold text-gray-800">
                        ${transaction.balance}
                      </p>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="flex items-center gap-2 text-sm">
                    <svg
                      className="w-4 h-4 text-gray-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <p className="text-gray-800 font-medium">
                        {formatDate(transaction.transactionDate)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatTime(transaction.transactionDate)}
                      </p>
                    </div>
                  </div>

                  {/* Account Details */}
                  <div className="space-y-2 pt-2">
                    {transaction.senderAccount != 0 && (
                      <div className="flex items-start gap-2 text-sm">
                        <svg
                          className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16l-4-4m0 0l4-4m-4 4h18"
                          />
                        </svg>
                        <div>
                          <p className="text-xs text-gray-500">From</p>
                          <p className="text-gray-700 font-mono text-xs sm:text-sm">
                            {formatAccount(transaction.senderAccount)}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-2 text-sm">
                      <svg
                        className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500">To</p>
                        <p className="text-gray-700 font-mono text-xs sm:text-sm">
                          {formatAccount(transaction.receiverAccount)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {transactionsData.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 text-center py-12 sm:py-16">
              <svg
                className="w-16 h-16 mx-auto text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-gray-500 text-base sm:text-lg">
                No transactions found
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Your transactions will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;

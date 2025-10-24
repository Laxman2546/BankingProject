import React from 'react';
import { FaWallet } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { FaCreditCard } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
export default function BalanceDashboard() {
  const cards = [
    {
      title: 'Current Balance',
      amount: '$12,345.67',
      icon: FaWallet,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Recent Deposit',
      amount: '$45,678.90',
      icon: FaArrowDown,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8'>
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className='group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1'
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color}`}></div>
                
                <div className='p-6'>
                  <div className='flex justify-between items-start mb-4'>
                    <div>
                      <h2 className='text-sm font-medium text-gray-500 uppercase tracking-wide mb-1'>
                        {card.title}
                      </h2>
                      <p className='text-2xl sm:text-3xl font-bold text-gray-800 transition-colors group-hover:text-gray-900'>
                        {card.amount}
                      </p>
                    </div>
                    
                    <div className={`${card.bgColor} p-3 rounded-xl transition-transform duration-300 group-hover:scale-110`}>
                      <Icon size={24} className={card.textColor} />
                    </div>
                  </div>
                  {card.title == "Current Balance" ?
                  <div className='flex items-center text-xs text-gray-500 mt-2'>
                  
                    <button className='text-white bg-primary p-3'>Deposit Money</button>
                  
                  </div>
                   :
                   <div className='flex items-center text-xs text-gray-500 mt-2'>
                    <span className='inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse'></span>
                    <span>Updated just now</span>
                  </div>}
                </div>
                <div className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            );
          })}
        </div>

        <div className='mt-8 bg-white rounded-2xl shadow-md p-6'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>Quick Actions</h3>
          <div className='flex flex-wrap gap-3'>
            <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium'>
              Transfer Money
            </button>
            <button className='px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium'>
              View Transactions
            </button>
            <button className='px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium'>
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
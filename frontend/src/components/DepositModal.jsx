import React, { useState } from 'react';
import axios from 'axios';

const DepositModal = ({ accountNumber, onClose, onDepositSuccess }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleDeposit = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/transactions/deposit`, null, {
        params: {
          accountNumber,
          amount,
        },
      });
      setMessage(response.data);
      onDepositSuccess();
      setTimeout(() => {
        onClose();
      }, 2000); 
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during deposit.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-11/12 max-w-md transform transition-all duration-300 scale-95 hover:scale-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Deposit Money</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>
        <form onSubmit={handleDeposit}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter amount"
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          {message && <p className="text-green-500 text-xs italic mb-4">{message}</p>}
          <div className="flex items-center justify-end gap-4">
            <button onClick={onClose} type="button" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-semibold transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary font-semibold transition-colors">Confirm Deposit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepositModal;
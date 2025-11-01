export const formatAccount = (account) => {
  if (!account) return "N/A";
  const accountNumber = account.toString();
  const formattedAccountNumber = accountNumber.slice(-4);
  return `**** ${formattedAccountNumber}`;
};

export const formatDate = (date) => {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return `${formattedDate}`;
};

export const formatTime = (date) => {
  const dateObj = new Date(date);
  const formattedTime = dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return `${formattedTime}`;
};

export const getTransactionConfig = (
  type,
  amount,
  senderAccount,
  receiverAccount,
  accountNumber
) => {
  const currentAccount = accountNumber.toString();
  const isCredit =
    type === "credit" ||
    (type === "deposit" && receiverAccount?.toString() === currentAccount) ||
    (type === "transfer" && receiverAccount?.toString() === currentAccount);

  const isDebit =
    type === "debit" ||
    (type === "withdraw" && senderAccount?.toString() === currentAccount) ||
    (type === "transfer" && senderAccount?.toString() === currentAccount);

  const typeConfigs = {
    deposit: {
      label: "Deposit",
      color: "bg-green-100 text-green-800",
      sign: receiverAccount?.toString() === currentAccount ? "+" : "-",
    },
    withdraw: {
      label: "Withdraw",
      color: "bg-red-100 text-red-800",
      sign: "-",
    },
    transfer: {
      label: "Transfer",
      color:
        senderAccount?.toString() === currentAccount
          ? "bg-red-100 text-red-800"
          : "bg-green-100 text-green-800",
      sign: senderAccount?.toString() === currentAccount ? "-" : "+",
    },
    created: {
      label: "Account Created",
      color: "bg-blue-100 text-blue-800",
      sign: "+",
    },
    debit: {
      label: "Debit",
      color: "bg-red-100 text-red-800",
      sign: "-",
    },
    credit: {
      label: "Credit",
      color: "bg-green-100 text-green-800",
      sign: "+",
    },
  };

  const config = typeConfigs[type] || {
    label: type.charAt(0).toUpperCase() + type.slice(1),
    color: "bg-gray-100 text-gray-800",
    sign: isCredit ? "+" : isDebit ? "-" : "",
  };

  return config;
};
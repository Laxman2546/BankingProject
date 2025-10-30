package com.codersbank.codersbank.models;

public class TransactionModel {
    private int id;
    private long senderAccount;
    private long receiverAccount;
    private double amount;
    private String transactionDate;
    private String transactionType;
    public  double balance;
    public String upiId;

    public TransactionModel() {
    }

    public TransactionModel(int id, long senderAccount, long receiverAccount, double amount, String transactionDate, String transactionType,double balance,String upiId) {
        this.id = id;
        this.senderAccount = senderAccount;
        this.receiverAccount = receiverAccount;
        this.amount = amount;
        this.transactionDate = transactionDate;
        this.transactionType = transactionType;
        this.balance = balance;
        this.upiId = upiId;
    }

    public TransactionModel(int id, double balance) {
        this.id = id;
        this.balance = balance;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public long getSenderAccount() {
        return senderAccount;
    }

    public void setSenderAccount(long senderAccount) {
        this.senderAccount = senderAccount;
    }

    public long getReceiverAccount() {
        return receiverAccount;
    }

    public void setReceiverAccount(long receiverAccount) {
        this.receiverAccount = receiverAccount;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(String transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getTransactionType() {
        return transactionType;
    }
    
    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }
    public double getBalance() {
        return balance;
    }
    public void setBalance(double balance) {
        this.balance = balance;
    }
    public String upiId() {
        return upiId;
    }
    public void setUpiId(String upiId) {
        this.upiId = upiId;
    }

}

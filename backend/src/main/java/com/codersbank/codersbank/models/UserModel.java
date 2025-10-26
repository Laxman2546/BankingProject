package com.codersbank.codersbank.models;

public class UserModel {
    private int id;
    private String name;
    private long accountnumber;
    private int pin;
    private int valid;
    private int cvv;

    public UserModel() {}

    public UserModel(int id, String name, long accountnumber, int pin, int valid, int cvv) {
        this.id = id;
        this.name = name;
        this.accountnumber = accountnumber;
        this.pin = pin;
        this.valid = valid;
        this.cvv = cvv;
    }

    public UserModel(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public UserModel(int id, String name, long accountnumber) {
        this.id = id;
        this.name = name;
        this.accountnumber = accountnumber;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public long getAccountNumber() { return accountnumber; }
    public void setAccountNumber(long accountnumber) { this.accountnumber = accountnumber; }

    public int getPin() { return pin; }
    public void setPin(int pin) { this.pin = pin; }

    public int getValid() { return valid; }
    public void setValid(int valid) { this.valid = valid; }

    public int getCvv() { return cvv; }
    public void setCvv(int cvv) { this.cvv = cvv; }
}

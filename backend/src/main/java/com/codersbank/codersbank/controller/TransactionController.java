package com.codersbank.codersbank.controller;

import com.codersbank.codersbank.repository.TransactionRepository;
import com.codersbank.codersbank.models.TransactionModel;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.*;


@RestController
@RequestMapping("/api/transactions")

public class TransactionController{
    @Autowired
    private TransactionRepository transRepo;
    @PostMapping("/deposit")
    public String deposit(
            @RequestParam Long accountNumber,
            @RequestParam double amount) {
        return transRepo.deposit(accountNumber, amount);
    } 
    @PostMapping("/withdraw")
    public String withdraw(
            @RequestParam Long accountNumber,
            @RequestParam double amount) {
        return transRepo.withdraw(accountNumber, amount);
    } 
    @GetMapping("/getbalance/{id}")
    public TransactionModel getbalance(@PathVariable int id){
        return transRepo.getbalance(id);
    }
}

package com.codersbank.codersbank.controller;
import com.codersbank.codersbank.repository.UserRepository;
import com.codersbank.codersbank.models.UserModel;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
@RequestMapping("/api/users")


public class UserController {

    @Autowired
    private UserRepository repo;
    @GetMapping
    public List <UserModel> getUsers(){
        return repo.getAllUsers();
    }
    @PostMapping("/add")
    public String addUser(@RequestBody UserModel user){
        return repo.addUser(user);
    }
    @GetMapping("/{id}")
    public UserModel  getUserById(@PathVariable int id){
        return repo.getUserById(id);
    }
}
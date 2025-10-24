package com.codersbank.codersbank.controller;
import com.codersbank.codersbank.repository.UserRepository;
import com.codersbank.codersbank.models.UserModel;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")


public class UserController {

    @Autowired
    private UserRepository repo;
    @GetMapping("/users")
    public List <UserModel> getUsers(){
        return repo.getAllUsers();
    } 
}
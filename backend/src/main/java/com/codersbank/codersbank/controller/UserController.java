package com.codersbank.codersbank.controller;
import com.codersbank.codersbank.repository.UserRepository;
import com.codersbank.codersbank.models.UserModel;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<UserModel> addUser(@RequestBody UserModel user) {
    UserModel newUser = repo.addUser(user);
    if (newUser != null) {
        return ResponseEntity.ok(newUser);
    } else {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}

    @PostMapping("/find")
    public UserModel findUser(@RequestBody UserModel user){
        return repo.findUser(user);
    }
    // @DeleteMapping("/delete/{id}")
    // public String deleteUser(@PathVariable int id){
    //     return repo.deleteUser(id);
    // }
    // @PutMapping("/update")
    // public String updateUser(@RequestBody UserModel user){
    //     return repo.updateUser(user);
    // }
    @GetMapping("/{id}")
    public UserModel  getUserById(@PathVariable int id){
        return repo.getUserById(id);
    }
}
package com.codersbank.codersbank;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class CodersbankApplication {
	public static void main(String[] args) {
		SpringApplication.run(CodersbankApplication.class, args);
	}
	@GetMapping("/")
	public String Home(){
		return "we are in backend";
	}

}

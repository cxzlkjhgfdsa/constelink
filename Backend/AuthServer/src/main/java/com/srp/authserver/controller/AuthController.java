package com.srp.authserver.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/auth/role")
public class AuthController {

	@GetMapping("/member")
	public ResponseEntity checkRoleMember(){
		return ResponseEntity.ok("인증 완료");
	}
	@GetMapping("/hospital")
	public ResponseEntity checkRoleHospital(){
		return ResponseEntity.ok("인증 완료");
	}
	@GetMapping("/admin")
	public ResponseEntity checkRoleAdmin(){
		return ResponseEntity.ok("인증 완료");
	}

}

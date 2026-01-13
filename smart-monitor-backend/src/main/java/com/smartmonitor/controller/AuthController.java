package com.smartmonitor.controller;

import com.smartmonitor.dto.LoginRequest;
import com.smartmonitor.dto.LoginResponse;
import com.smartmonitor.entity.User;
import com.smartmonitor.repo.UserRepository;
import com.smartmonitor.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final UserRepository userRepo;
  private final JwtUtil jwtUtil;
  private final PasswordEncoder encoder;

  public AuthController(UserRepository userRepo, JwtUtil jwtUtil, PasswordEncoder encoder) {
    this.userRepo = userRepo;
    this.jwtUtil = jwtUtil;
    this.encoder = encoder;
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req){
    User user = userRepo.findByEmail(req.email)
        .orElseThrow(() -> new RuntimeException("User not found"));

    if(!encoder.matches(req.password, user.getPassword()))
      return ResponseEntity.status(401).body(Map.of("message","Invalid credentials"));

    String token = jwtUtil.generateToken(user.getEmail());
    Map<String,Object> userMap = Map.of(
        "id", user.getId(),
        "name", user.getName(),
        "email", user.getEmail(),
        "role", user.getRole()
    );
    return ResponseEntity.ok(new LoginResponse(token, userMap));
  }
}

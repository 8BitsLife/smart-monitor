package com.smartmonitor.controller;

import com.smartmonitor.dto.CreateUserRequest;
import com.smartmonitor.entity.User;
import com.smartmonitor.repo.UserRepository;
import jakarta.validation.Valid;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UsersController {

  private final UserRepository userRepo;
  private final PasswordEncoder encoder;

  public UsersController(UserRepository userRepo, PasswordEncoder encoder) {
    this.userRepo = userRepo;
    this.encoder = encoder;
  }

  @GetMapping
  public List<Map<String, Object>> list(){
    return userRepo.findAll().stream()
            .map(u -> {
              Map<String, Object> m = new java.util.HashMap<>();
              m.put("id", u.getId());
              m.put("name", u.getName());
              m.put("email", u.getEmail());
              m.put("role", u.getRole());
              return m;
            })
            .toList();
  }

  @PostMapping
  public Map<String,Object> create(@Valid @RequestBody CreateUserRequest req){
    if(userRepo.existsByEmail(req.email)) throw new RuntimeException("Email already exists");
    User u = User.builder()
        .name(req.name)
        .email(req.email)
        .password(encoder.encode(req.password))
        .role(req.role==null?"USER":req.role)
        .build();
    userRepo.save(u);
    return Map.of("id", u.getId());
  }

  @DeleteMapping("/{id}")
  public Map<String,Object> delete(@PathVariable Long id){
    userRepo.deleteById(id);
    return Map.of("ok", true);
  }
}

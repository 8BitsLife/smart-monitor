package com.smartmonitor.controller;

import com.smartmonitor.dto.ProductivitySessionRequest;
import com.smartmonitor.entity.ProductivitySession;
import com.smartmonitor.entity.User;
import com.smartmonitor.repo.ProductivityRepository;
import com.smartmonitor.repo.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/productivity")
public class ProductivityController {

  private final ProductivityRepository prodRepo;
  private final UserRepository userRepo;

  public ProductivityController(ProductivityRepository prodRepo, UserRepository userRepo) {
    this.prodRepo = prodRepo;
    this.userRepo = userRepo;
  }

  @PostMapping("/session")
  public Map<String,Object> saveSession(Authentication auth, @RequestBody ProductivitySessionRequest req){
    User u = userRepo.findByEmail(auth.getName()).orElseThrow();
    Instant now = Instant.now();
    ProductivitySession s = ProductivitySession.builder()
        .user(u)
        .endedAt(now)
        .startedAt(now.minusSeconds(req.durationSeconds))
        .durationSeconds(req.durationSeconds)
        .distractions(req.distractions)
        .build();
    prodRepo.save(s);
    return Map.of("ok", true);
  }

  @GetMapping("/recent")
  public List<Map<String, Object>> recent(Authentication auth){
    User u = userRepo.findByEmail(auth.getName()).orElseThrow();

    return prodRepo.findTop20ByUserIdOrderByEndedAtDesc(u.getId()).stream()
            .map(s -> {
              Map<String, Object> m = new java.util.HashMap<>();
              m.put("durationSeconds", s.getDurationSeconds());
              m.put("distractions", s.getDistractions());
              m.put("endedAt", s.getEndedAt().toString());
              return m;
            })
            .toList();
  }
}

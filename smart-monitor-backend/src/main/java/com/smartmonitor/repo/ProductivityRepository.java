package com.smartmonitor.repo;

import com.smartmonitor.entity.ProductivitySession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductivityRepository extends JpaRepository<ProductivitySession, Long> {
  List<ProductivitySession> findTop20ByUserIdOrderByEndedAtDesc(Long userId);
}

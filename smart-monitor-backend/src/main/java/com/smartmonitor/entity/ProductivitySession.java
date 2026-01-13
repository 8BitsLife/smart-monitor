package com.smartmonitor.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ProductivitySession {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Instant startedAt;
  private Instant endedAt;

  private long durationSeconds;
  private int distractions;

  @ManyToOne(optional=false)
  private User user;
}

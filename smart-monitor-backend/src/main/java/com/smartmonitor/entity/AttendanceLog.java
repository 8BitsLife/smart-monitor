package com.smartmonitor.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AttendanceLog {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private LocalDate date;

  @Enumerated(EnumType.STRING)
  private Status status;

  @ManyToOne(optional=false)
  private User user;

  public enum Status { PRESENT, ABSENT }
}

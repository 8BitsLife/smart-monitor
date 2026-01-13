package com.smartmonitor.service;

import com.smartmonitor.entity.AttendanceLog;
import com.smartmonitor.entity.User;
import com.smartmonitor.repo.AttendanceRepository;
import com.smartmonitor.repo.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataSeeder {

  private final UserRepository userRepo;
  private final AttendanceRepository attendanceRepo;
  private final PasswordEncoder encoder;

  public DataSeeder(UserRepository userRepo, AttendanceRepository attendanceRepo, PasswordEncoder encoder) {
    this.userRepo = userRepo;
    this.attendanceRepo = attendanceRepo;
    this.encoder = encoder;
  }

  @PostConstruct
  public void seed(){
    if(!userRepo.existsByEmail("demo@gmail.com")){
      User demo = User.builder()
          .name("Demo User")
          .email("demo@gmail.com")
          .password(encoder.encode("demo123"))
          .role("USER")
          .build();
      userRepo.save(demo);

      List<AttendanceLog> logs = List.of(
          AttendanceLog.builder().user(demo).date(LocalDate.now().minusDays(1)).status(AttendanceLog.Status.PRESENT).build(),
          AttendanceLog.builder().user(demo).date(LocalDate.now().minusDays(2)).status(AttendanceLog.Status.ABSENT).build(),
          AttendanceLog.builder().user(demo).date(LocalDate.now().minusDays(3)).status(AttendanceLog.Status.PRESENT).build()
      );
      attendanceRepo.saveAll(logs);
    }
  }
}

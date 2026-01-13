package com.smartmonitor.controller;

import com.smartmonitor.entity.AttendanceLog;
import com.smartmonitor.entity.User;
import com.smartmonitor.repo.AttendanceRepository;
import com.smartmonitor.repo.ProductivityRepository;
import com.smartmonitor.repo.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

  private final UserRepository userRepo;
  private final AttendanceRepository attendanceRepo;
  private final ProductivityRepository prodRepo;

  public DashboardController(UserRepository userRepo, AttendanceRepository attendanceRepo, ProductivityRepository prodRepo) {
    this.userRepo = userRepo;
    this.attendanceRepo = attendanceRepo;
    this.prodRepo = prodRepo;
  }

  @GetMapping("/summary")
  public Map<String,Object> summary(Authentication auth){
    User u = userRepo.findByEmail(auth.getName()).orElseThrow();
    List<AttendanceLog> logs = attendanceRepo.findByUserIdOrderByDateDesc(u.getId());
    long present = logs.stream().filter(a -> a.getStatus()== AttendanceLog.Status.PRESENT).count();
    long total = logs.size();
    int percent = total==0?0:(int)Math.round((present*100.0)/total);

    // simple focus score heuristic: more sessions and fewer distractions
    var sessions = prodRepo.findTop20ByUserIdOrderByEndedAtDesc(u.getId());
    long sec = sessions.stream().mapToLong(s->s.getDurationSeconds()).sum();
    int distractions = sessions.stream().mapToInt(s->s.getDistractions()).sum();
    int focus = (int)Math.max(0, Math.min(100, (sec/60.0)/5.0 * 10 - distractions)); // demo

    return Map.of(
        "attendancePercent", percent,
        "focusScore", focus,
        "distractionsToday", distractions,
        "studyTimeToday", String.format("%dh %dm", sec/3600, (sec%3600)/60),
        "weeklyFocus", List.of(
            Map.of("day","Mon","focus",72), Map.of("day","Tue","focus",81), Map.of("day","Wed","focus",65),
            Map.of("day","Thu","focus",79), Map.of("day","Fri","focus",85), Map.of("day","Sat","focus",60), Map.of("day","Sun","focus",90)
        ),
        "studyHours", List.of(
            Map.of("day","Mon","hours",3.2), Map.of("day","Tue","hours",4.8), Map.of("day","Wed","hours",2.5),
            Map.of("day","Thu","hours",5.1), Map.of("day","Fri","hours",4.3), Map.of("day","Sat","hours",1.9), Map.of("day","Sun","hours",6.0)
        )
    );
  }
}

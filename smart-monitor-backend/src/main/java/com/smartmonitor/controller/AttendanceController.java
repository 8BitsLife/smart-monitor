package com.smartmonitor.controller;

import com.smartmonitor.entity.AttendanceLog;
import com.smartmonitor.entity.User;
import com.smartmonitor.repo.AttendanceRepository;
import com.smartmonitor.repo.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceRepository attendanceRepo;
    private final UserRepository userRepo;

    public AttendanceController(AttendanceRepository attendanceRepo, UserRepository userRepo) {
        this.attendanceRepo = attendanceRepo;
        this.userRepo = userRepo;
    }

    // ✅ Get current user's attendance logs
    @GetMapping("/me")
    public List<Map<String, Object>> myAttendance(Authentication auth) {
        String email = auth.getName();
        User u = userRepo.findByEmail(email).orElseThrow();

        return attendanceRepo.findByUserIdOrderByDateDesc(u.getId()).stream()
                .map(a -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("date", a.getDate().toString());
                    m.put("status", a.getStatus().toString());
                    return m;
                })
                .toList();
    }

    // ✅ OPTIONAL: Admin can add attendance for a user
    @PostMapping("/add")
    public Map<String, Object> addAttendance(@RequestParam Long userId,
                                             @RequestParam String date,
                                             @RequestParam AttendanceLog.Status status) {

        User u = userRepo.findById(userId).orElseThrow();

        AttendanceLog log = AttendanceLog.builder()
                .user(u)
                .date(java.time.LocalDate.parse(date))
                .status(status)
                .build();

        attendanceRepo.save(log);

        Map<String, Object> res = new HashMap<>();
        res.put("ok", true);
        res.put("message", "Attendance added successfully");
        return res;
    }
}
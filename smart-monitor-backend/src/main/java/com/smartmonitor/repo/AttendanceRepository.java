package com.smartmonitor.repo;

import com.smartmonitor.entity.AttendanceLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttendanceRepository extends JpaRepository<AttendanceLog, Long> {
  List<AttendanceLog> findByUserIdOrderByDateDesc(Long userId);
}

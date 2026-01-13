package com.smartmonitor.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportsController {

  @GetMapping("/weekly")
  public Map<String,Object> weekly(){
    return Map.of("improvement", "+12%");
  }
}

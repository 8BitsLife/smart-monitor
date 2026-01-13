package com.smartmonitor.dto;

import java.util.Map;

public class LoginResponse {
  public String token;
  public Map<String, Object> user;

  public LoginResponse(String token, Map<String, Object> user){
    this.token = token;
    this.user = user;
  }
}

package com.smartmonitor.dto;

import jakarta.validation.constraints.NotBlank;

public class CreateUserRequest {
  @NotBlank public String name;
  @NotBlank public String email;
  @NotBlank public String password;
  public String role = "USER";
}

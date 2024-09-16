package com.recruitease.auth_service.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CustomerRequest(
        @NotNull(message = "Email is required")
        @NotEmpty(message = "Email cannot be empty")
        @Email(message = "Email is not a valid email address")
        String email,
        @NotNull(message = "Password is required")
        @NotEmpty(message = "Password cannot be empty")
        String password,
        @NotNull(message = "First Name is required")
        @NotEmpty(message = "First Name cannot be empty")
        String firstName,
        @NotNull(message = "Last Name is required")
        @NotEmpty(message = "Last Name cannot be empty")
        String lastName,
        @NotNull(message = "Mobile Number is required")
        @NotEmpty(message = "Mobile Number cannot be empty")
        String mobileNumber,
        @NotNull(message = "Security Question is required")
        @NotEmpty(message = "Security Question cannot be empty")
        String securityQuestion,
        @NotNull(message = "Security Answer is required")
        @NotEmpty(message = "Security Answer cannot be empty")
        String answer
) {
}

package com.recruitease.auth_service.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record ResetPass(
        @NotNull(message = "Email is required")
        @NotEmpty(message = "Email cannot be empty")
        String email,
        @NotNull(message = "Security Question is required")
        @NotEmpty(message = "Security Question cannot be empty")
        String securityQuestion,
        @NotNull(message = "Answer is required")
        @NotEmpty(message = "Answer cannot be empty")
        String answer,
        @NotNull(message = "New Password is required")
        @NotEmpty(message = "New Password cannot be empty")
        String newPassword
) {
}

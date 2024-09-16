package com.recruitease.auth_service.DTO.LoggedUser;

public record LoggedUserHeader(
        String id,
        String email,
        String role,
        String securityQuestion,
        Object roleDetails,
        String createdAt,
        String sub,
        String iat,
        String exp
) {
}

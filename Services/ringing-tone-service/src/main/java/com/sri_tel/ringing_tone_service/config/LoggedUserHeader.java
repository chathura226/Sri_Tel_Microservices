package com.sri_tel.ringing_tone_service.config;

public record LoggedUserHeader(
        String id,
        String email,
        String role,
        Object roleDetails,
        String isActive,
        String createdAt,
        String sub,
        String iat,
        String exp
) {
}

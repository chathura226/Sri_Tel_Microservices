package com.recruitease.auth_service.DTO.LoggedUser;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoggedCustomer {
    private String id;
    private String email;
    private String role;
    private String createdAt;
    private String firstName;
    private String lastName;
    private String securityQuestion;
    private String candidateId;
}

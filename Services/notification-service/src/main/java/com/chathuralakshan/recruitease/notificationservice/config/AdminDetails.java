package com.chathuralakshan.recruitease.notificationservice.config;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AdminDetails {
    private String firstName;
    private String lastName;
    private String adminId;
}

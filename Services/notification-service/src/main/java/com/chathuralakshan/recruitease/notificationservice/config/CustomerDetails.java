package com.chathuralakshan.recruitease.notificationservice.config;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CustomerDetails {
    private String firstName;
    private String lastName;
    private String customerId;
    private String mobileNumber;
}

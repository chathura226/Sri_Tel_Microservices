package com.chathuralakshan.recruitease.packageservice.config;

import lombok.*;

@Getter
@Setter
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

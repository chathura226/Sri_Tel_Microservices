package com.sri_tel.ringing_tone_service.config;

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

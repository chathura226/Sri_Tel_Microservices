package com.chathuralakshan.recruitease.billservice.config;

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
    private String candidateId;
}

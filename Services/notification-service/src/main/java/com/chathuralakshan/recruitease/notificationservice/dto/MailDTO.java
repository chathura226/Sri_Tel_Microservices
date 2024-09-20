package com.chathuralakshan.recruitease.notificationservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MailDTO {

    private String to;
    private String subject;
    private String body;

}

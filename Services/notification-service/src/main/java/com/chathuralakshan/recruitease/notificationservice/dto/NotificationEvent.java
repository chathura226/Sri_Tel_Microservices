package com.chathuralakshan.recruitease.notificationservice.dto;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationEvent implements Serializable {
    private String message;
    private String type;

    @Email
    private String recipient;
    private boolean delivered;
}

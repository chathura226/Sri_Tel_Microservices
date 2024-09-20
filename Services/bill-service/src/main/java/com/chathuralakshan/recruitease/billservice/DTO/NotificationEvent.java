package com.chathuralakshan.recruitease.billservice.DTO;

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
    private String recipient;
    private boolean delivered;
}
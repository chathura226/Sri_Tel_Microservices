package com.chathuralakshan.recruitease.notificationservice.controller;

import com.chathuralakshan.recruitease.notificationservice.dto.MailDTO;
import com.chathuralakshan.recruitease.notificationservice.dto.NotificationEvent;
import com.chathuralakshan.recruitease.notificationservice.dto.ResponseDTO;
import com.chathuralakshan.recruitease.notificationservice.entity.Notification;
import com.chathuralakshan.recruitease.notificationservice.service.MailService;
import com.chathuralakshan.recruitease.notificationservice.service.NotificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/notification")
@CrossOrigin
public class NotificationController {

    @Autowired
    NotificationService notificationService;

    @Autowired
    MailService mailService;

    MailDTO mailDTO = new MailDTO();

    //? Kafka listener
    @KafkaListener(topics = "new-topic")
    public void handleNotification(NotificationEvent notificationEvent) {
        log.info("Received notification : {}", notificationEvent.getMessage());

        mailDTO.setTo(notificationEvent.getRecipient());
        mailDTO.setSubject("Sri Tel - Alert Notification");
        mailDTO.setBody(notificationEvent.getMessage());

        //? Sending a mail
        mailService.sendMail(mailDTO);
    }

    //? For testing
    @GetMapping
    public String testing() {
        return "Notification Service is up and running";
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseDTO> createNotification(@RequestBody Notification notification) {
        return ResponseEntity.ok(notificationService.createNotification(notification));
    }

    @GetMapping("/get-all")
    public ResponseEntity<ResponseDTO> getAllNotifications() {
        return ResponseEntity.ok(notificationService.getAllNotifications());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ResponseDTO> getNotificationById(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.getNotificationById(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseDTO> deleteNotification(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.deleteNotification(id));
    }

    @PutMapping("/mark-delivered/{id}")
    public ResponseEntity<ResponseDTO> markAsDelivered(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.markAsDelivered(id));
    }

}

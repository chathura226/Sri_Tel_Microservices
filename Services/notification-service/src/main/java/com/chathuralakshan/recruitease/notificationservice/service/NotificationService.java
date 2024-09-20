package com.chathuralakshan.recruitease.notificationservice.service;

import com.chathuralakshan.recruitease.notificationservice.dto.NotificationEvent;
import com.chathuralakshan.recruitease.notificationservice.dto.ResponseDTO;
import com.chathuralakshan.recruitease.notificationservice.entity.Notification;
import com.chathuralakshan.recruitease.notificationservice.repository.NotificationRepository;
import com.chathuralakshan.recruitease.notificationservice.utils.CodeList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    ResponseDTO responseDTO;

    //* This should be performed in the application that requests a notification creation
    @Autowired
    KafkaTemplate<String, NotificationEvent> kafkaTemplate;

    HashMap<String, String> errors = new HashMap<>();

    public ResponseDTO createNotification(Notification notification) {

        try {
            //? TODO - Include basic validation rules

            //? Default value initialization
            notification.setDelivered(false);

            Notification savedNotification = notificationRepository.save(notification);

            if(errors.isEmpty()) {
                responseDTO.setCode(CodeList.RSP_SUCCESS);
                responseDTO.setMessage("Notification Sent");
                responseDTO.setContent(savedNotification);

                //* This should be performed in the application that requests a notification creation
                NotificationEvent notificationEvent = new NotificationEvent();
                notificationEvent.setMessage(notification.getMessage());
                notificationEvent.setType(notification.getType());
                notificationEvent.setRecipient(notification.getRecipient());
                notificationEvent.setDelivered(notification.isDelivered());

                kafkaTemplate.send("new-topic", notificationEvent);
            } else {
                responseDTO.setCode(CodeList.RSP_VALIDATION_FAILED);
                responseDTO.setMessage("Validation Error");
                responseDTO.setContent(notification);
                responseDTO.setErrors(errors);
            }

        } catch (Exception e) {
            errors.put("error", "Something went wrong");

            responseDTO.setCode(CodeList.RSP_FAIL);
            responseDTO.setMessage("Failed to send the notification");
            responseDTO.setContent(notification);
            responseDTO.setErrors(errors);
        }

        return responseDTO;
    }


    public ResponseDTO getAllNotifications() {

        List<Notification> notifications = notificationRepository.findAll();

        if(notifications.isEmpty()) {
            responseDTO.setMessage("No notifications found");
            responseDTO.setCode(CodeList.RSP_NO_DATA_FOUND);
            responseDTO.setContent(null);
        } else {
            responseDTO.setContent(notificationRepository.findAll());
            responseDTO.setMessage("Getting all the notifications");
            responseDTO.setCode(CodeList.RSP_SUCCESS);
        }

        return responseDTO;
    }

    public ResponseDTO getNotificationById(Long id) {
        try {
            Notification notification = notificationRepository.findById(String.valueOf(id))
                    .orElseThrow(() -> new IllegalArgumentException("Notification not found"));

            responseDTO.setCode(CodeList.RSP_SUCCESS);
            responseDTO.setMessage("Notification found");
            responseDTO.setContent(notification);

        } catch (Exception e) {
            errors.put("error", "Notification not found");
            responseDTO.setCode(CodeList.RSP_FAIL);
            responseDTO.setMessage("Failed to retrieve the notification");
            responseDTO.setErrors(errors);
            responseDTO.setContent(null);
        }

        return responseDTO;
    }

    //? Notification update function will not be created

    public ResponseDTO deleteNotification(Long id) {
        try {
            Notification notification = notificationRepository.findById(String.valueOf(id))
                    .orElseThrow(() -> new Exception("No notification found"));

            notificationRepository.delete(notification);

            responseDTO.setCode(CodeList.RSP_SUCCESS);
            responseDTO.setMessage("Notification deleted successfully");
            responseDTO.setContent(notification);

        } catch (Exception e) {
            errors.put("error", "Failed to delete notification");
            responseDTO.setCode(CodeList.RSP_FAIL);
            responseDTO.setMessage("Error occurred while deleting notification");
            responseDTO.setErrors(errors);
            responseDTO.setContent(null);
        }

        return responseDTO;
    }

    public ResponseDTO markAsDelivered(Long id) {
        try {
            Notification notification = notificationRepository.findById(String.valueOf(id))
                    .orElseThrow(() -> new IllegalArgumentException("Notification not found"));

            notification.setDelivered(true);
            Notification updatedNotification = notificationRepository.save(notification);

            responseDTO.setCode(CodeList.RSP_SUCCESS);
            responseDTO.setMessage("Notification marked as delivered");
            responseDTO.setContent(updatedNotification);

        } catch (Exception e) {
            errors.put("error", "Failed to mark notification as delivered");
            responseDTO.setCode(CodeList.RSP_FAIL);
            responseDTO.setMessage("Error occurred while marking notification as delivered");
            responseDTO.setErrors(errors);
            responseDTO.setContent(null);
        }

        return responseDTO;
    }

}

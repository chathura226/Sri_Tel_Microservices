package com.chathuralakshan.recruitease.notificationservice.repository;

import com.chathuralakshan.recruitease.notificationservice.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, String> {
}

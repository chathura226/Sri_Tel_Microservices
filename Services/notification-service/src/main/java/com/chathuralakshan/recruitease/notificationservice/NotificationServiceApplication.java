package com.chathuralakshan.recruitease.notificationservice;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.record.RecordModule;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.kafka.annotation.KafkaListener;

@Slf4j
@SpringBootApplication
@EnableJpaAuditing
@EnableDiscoveryClient
public class NotificationServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(NotificationServiceApplication.class, args);
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper().registerModule(new RecordModule());
    }

    @KafkaListener(topics = "new-topic")
    public void handleNotification(String data) {
        System.out.println("Received notification with ID: " + data);
        log.info("Received notification with ID: {}", data);
    }
}

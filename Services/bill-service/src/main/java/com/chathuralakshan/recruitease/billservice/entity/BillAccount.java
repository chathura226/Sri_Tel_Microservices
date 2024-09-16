package com.chathuralakshan.recruitease.billservice.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bill_account")
public class BillAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String billAccId;
    private String userId;
    @Column(nullable = false)
    private Double currentBalance;

    @Column(nullable = false)
    private LocalDate dueDate;

    @Column(nullable = false)
    private String status; // ACTIVE, SUSPENDED


    @LastModifiedDate
    private LocalDateTime lastModifiedAt;

}

package com.chathuralakshan.recruitease.billservice.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String paymentId;
    @ManyToOne
    @JoinColumn(name = "bill_acc_id")
    private BillAccount billAccount;
    @Column(nullable = false)
    private Double amount;

    @CreatedDate
    private LocalDateTime paymentAt;

    @Column(nullable = false)
    private String paymentMethod;



}
